<script setup lang="ts">
import StackGrid from '@crob/vue-stack-grid';

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
</script>
<template>
  <div>
    <div class="container py-4">
      <StackGrid ref="stackGridRef" :items="images" :column-min-width="300" :gutter-width="10" :gutter-height="10" class="gallery">
        <template #item="{ item }">
            <NuxtImg
              :src="item.src"
              :class="[
                { 'not-focus': itemHover !== item.id && itemHover && mode === MODES.FOCUS },
                { 'hover:cursor-none hover:ring hover:ring-8 hover:ring-white-100 hover:rounded-md': mode === MODES.FOCUS }]"
              class="transition duration-300 h-full object-cover block"
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