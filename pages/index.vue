<script setup lang="ts">
import { NuxtLoadingIndicator } from '#components';
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

const MODES = {
  FOCUS: 0,
  VIEW: 1
}
const itemHover = ref()
const mode = ref(MODES.FOCUS)

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
    <div class="container">
      <StackGrid ref="stackGridRef" :items="images" :column-min-width="300" :gutter-width="10" :gutter-height="10">
        <template #item="{ item }">
          <div>
            <NuxtImg
              loading="lazy"
              format="webp"
              class="h-full object-cover block"
              :class="{ 'not-focus': itemHover !== item.id && itemHover && mode === MODES.FOCUS }" :src="item.src"
              alt="img" @mouseenter="itemHover = item.id" @mouseleave="itemHover = ''" 
              @load="imageIsReady"
            />
          </div>
        </template>
      </StackGrid>
    </div>
  </div>
</template>