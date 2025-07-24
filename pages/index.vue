<script setup lang="ts">
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useIntersectionObserver, useWindowScroll } from "@vueuse/core";

const route = useRoute()
const { currentImages, currentCursor } = storeToRefs(useImageStore())

const { $gsap: gsap } = useNuxtApp();
definePageMeta({
  layout: "landing",
  name: 'Home'
});

const { getImageHeight } = useTools()
const { notionGetImages, notionGetMoreImages } = useNotion()
await notionGetImages()

const images = ref<SimpleImage[]>([])
const isFirstLoad = ref(true)

const setImagesHeight = async () => {
  const tasks = currentImages.value
    .filter(image => 
      !image.height && !images.value.some(img => img.id === image.id)
    )
    .map(async image => {
      const height = await getImageHeight(image.srcLoading);
      return { ...image, height: height * 4, url: `?index=${image.index}` };
    });
  const resolvedImages = await Promise.all(tasks);
  images.value.push(...resolvedImages);
  isFirstLoad.value = false;
};

const refGallery = ref()
const isReady = computed(() => !!images.value.length)

const setOverflow = (hidden?: boolean) => {
  const HTMLElement = document.querySelector('html')

  if (hidden) HTMLElement?.setAttribute("style", "overflow: hidden")
  else HTMLElement?.setAttribute("style", "overflow: auto")

}
const initScroll = () => {
  ScrollSmoother.create({
    effects: false,
    smooth: 1.2,
    content: '#main-layout'
  })
}
onMounted(async () => {
  gsap.registerPlugin(ScrollSmoother);
  initScroll()
  setImagesHeight()
})

watch(() => route.query.index, (value) => {
  setOverflow(!!value?.toString())
})

const refLoadmore = useTemplateRef<HTMLDivElement>('refLoadmore')
const isLoadmore = ref(false)

const { stop } = useIntersectionObserver(
  refLoadmore,
  async ([entry]) => {
    console.log(currentCursor.value);
    
    if (entry?.isIntersecting && currentCursor.value) {
      isLoadmore.value = true
      await notionGetMoreImages(currentCursor.value)
      await setImagesHeight()
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
  <div class="relative">
    <Teleport to="#back-to-top">
      <NBScrollToTop v-if="y > 300" @click="onBackToTop" />
    </Teleport>
    <div id="gallery" ref="refGallery" class="container py-4 relative">
      <ClientOnly>
        <VueBitsMasonry
          :items="images"
          :duration="0.6"
          :stagger="0.05"
          animate-from="bottom"
          :scale-on-hover="true"
          :hover-scale="0.95"
          :blur-to-focus="true"
          :color-shift-on-hover="false"
        />
        <div v-if="isReady" ref="refLoadmore" />
        <div class="mt-4 text-center">
          <UIcon v-show="isLoadmore" name="line-md:loading-loop" size="48" class="animate-spin text-gray-500 dark:text-gray-400" />
        </div>
      </ClientOnly>
      <PreviewImageController v-if="isReady" :currentCursor="currentCursor" />
    </div>
  </div>
</template>