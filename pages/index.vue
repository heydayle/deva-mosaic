<script setup lang="ts">
import StackGrid from '@crob/vue-stack-grid';
import { gsap } from "gsap";
import { useWindowSize, useIntersectionObserver, useWindowScroll } from "@vueuse/core";

definePageMeta({
  layout: "landing",
  name: 'Home'
});
useHead({
  title: 'Library of memory!',
  meta: [
    {
      name: 'description',
      content: 'Memories of Thinh'
    }
  ]
});

const route = useRoute()
const store = useStore()
const { isFocusing } = storeToRefs(store)
const { currentImages, currentCursor } = storeToRefs(useImageStore())

const { notionGetImages, notionGetMoreImages } = useNotion()
await notionGetImages()

const images = computed(() => currentImages.value || [])

const MODES = {
  FOCUS: true,
  VIEW: false
}
const itemHover = ref()
const mode = computed(() => isFocusing.value)

const stackGridRef = ref()
const refGallery = ref()
const count = ref(0)

const imageIsReady = () => {
  if (count.value < images.value.length) {
    stackGridRef.value.reflow()
    count.value++
    if (processPercent.value > 90) {
      stackGridRef.value.reflow()
    }
  }
}
const processPercent = computed(() => Math.round((count.value / images.value.length) * 100))
const isReady = computed(() => !!images.value.length )

const onDockingImages = () => {
  gsap.set('.image-item', { opacity: 1 })
  gsap.timeline().from('.image-item', { opacity: 0, ease: 'back' })
}
const setOverflow = (hidden?: boolean) => {
  const HTMLElement = document.querySelector('html')

  if (hidden) HTMLElement?.setAttribute("style", "overflow: hidden")
  else HTMLElement?.setAttribute("style", "overflow: auto")

}
onMounted(async () => {
  setOverflow(true)
  onDockingImages()
  setImageSize()
})

const { width, height } = useWindowSize()
const minWidth = ref(240)

const setImageSize = () => {
  const containerWidth = document.querySelector('.container')?.clientWidth
  const imageSize = containerWidth && Math.round(containerWidth / 5.5) || 200
  if (width.value < 500 && containerWidth)
    minWidth.value = width.value - (width.value - containerWidth)
  else minWidth.value = imageSize
}

const refProcess = ref()
watch(processPercent, (value) => {
  if (value>90) {
    setOverflow()
    gsap.to(refProcess.value, {
      opacity: 0,
      duration: 0.7
    })
    gsap.to(refProcess.value, {
      display: 'none',
      duration: 0.7,
      delay: 1,
    })
  }
})
watch(() => route.query.index, (value) => {
  setOverflow(!!value?.toString())
})

const refLoadmore = useTemplateRef<HTMLDivElement>('refLoadmore')
const isLoadmore = ref(false)

const { stop } = useIntersectionObserver(
  refLoadmore,
  async ([entry]) => {
    if (entry?.isIntersecting && currentCursor.value) {
      isLoadmore.value = true
      await notionGetMoreImages(currentCursor.value)
      stackGridRef.value.reflow()
      isLoadmore.value = false
    }
  },
)

const { y } = useWindowScroll({ behavior: 'smooth' })
const onBackToTop = () => {
  y.value = 0
}
</script>
<template>
  <div>
    <Teleport to="#back-to-top">
      <NBScrollToTop @click="onBackToTop"/>
    </Teleport>
    <div ref="refProcess" class="fixed top-0 left-0 z-[99999] w-screen h-screen flex items-center px-20 bg-black/50 backdrop-blur-3xl">
      <UProgress class="m-auto" :value="processPercent" size="2xs" indicator>
        <template #indicator="{ percent }">
          <div class="text-center w-full">
            <span class="inline-flex text-primary-500 items-center">
              <UIcon name="line-md:downloading-loop" class="mr-2" size="24" /> {{ percent < 5 ? 'Initializing...' : percent < 20
                ? ' Getting...' : percent < 60 ? ' Arranging...' : ' Loading...' }} </span>
          </div>
        </template>
      </UProgress>
    </div>
    <div id="gallery" ref="refGallery" class="container py-4 relative">
      <StackGrid
        ref="stackGridRef"
        :items="images"
        :column-min-width="minWidth"
        :gutter-width="20"
        :gutter-height="20"
        class="gallery"
      >
        <template #item="{ item }">
          <NuxtLinkLocale :to="{ path: '/', query: { index: item.index }}">
            <NuxtImg
              :src="item.src"
              :class="[
                { 'not-focus': itemHover !== item.id && itemHover && mode === MODES.FOCUS },
                { 'hover:rounded-md': mode === MODES.FOCUS }]"
              class="mouse-object image-item transition duration-300 block cursor-none"
              alt="img"
              loading="lazy"
              @mouseenter="itemHover = item.id"
              @mouseleave="itemHover = ''"
              @load="imageIsReady"
            />
          </NuxtLinkLocale>
        </template>
      </StackGrid>
      <div v-if="isReady" ref="refLoadmore" />
      <div class="mt-4 text-center">
        <UIcon v-show="isLoadmore" size="48" name="line-md:downloading-loop" />
      </div>
      <PreviewImageController v-if="isReady" :currentCursor="currentCursor" />
    </div>
  </div>
</template>