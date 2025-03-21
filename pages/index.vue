<script setup lang="ts">
import StackGrid from '@crob/vue-stack-grid';
import { gsap } from "gsap";

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

const { notionGetImages } = useNotion()
const { convertNotionPagesToImageList } = useTools()
const { data } = await notionGetImages()

const images = computed(() => convertNotionPagesToImageList(data.value.results).filter(item => item.src) || [])

const store = useStore()
const { isFocusing } = storeToRefs(store)

const MODES = {
  FOCUS: true,
  VIEW: false
}
const itemHover = ref()
const mode = computed(() => isFocusing.value)

const stackGridRef = ref()
const count = ref(0)

const imageIsReady = () => {
  if (count.value < images.value.length) {
    stackGridRef.value.reflow()
    count.value++
  }
}

const onDockingImages = () => {
  gsap.set('.image-item', { scale: 1 })
  gsap.timeline().from('.image-item', { scale: 0, ease: 'back' })
}
onMounted(() => {
  onDockingImages()
})

const minWidth = ref(200)
// const onIncrease = () => {
//   minWidth.value = minWidth.value - 100
//   stackGridRef.value.reflow()
// }
// const onDecrease = () => {
//   minWidth.value = minWidth.value + 100
//   stackGridRef.value.reflow()
// }
</script>
<template>
  <div>
    <div id="gallery" class="container py-4 relative">
<!--      <UButton @click="onIncrease">Increase</UButton>-->
<!--      <UButton @click="onDecrease">Decrease</UButton>-->
      <StackGrid ref="stackGridRef" :items="images" :column-min-width="minWidth" :gutter-width="20" :gutter-height="20" class="gallery">
        <template #item="{ item }">
            <NuxtImg
              :src="item.src"
              :class="[
                { 'not-focus': itemHover !== item.id && itemHover && mode === MODES.FOCUS },
                { 'hover:rounded-md': mode === MODES.FOCUS }]"
              class="mouse-object image-item transition duration-300 h-full object-cover block"
              alt="img"
              loading="lazy"
              format="webp"
              @mouseenter="itemHover = item.id"
              @mouseleave="itemHover = ''" 
              @load="imageIsReady"
            />
        </template>
      </StackGrid>
    </div>
  </div>
</template>