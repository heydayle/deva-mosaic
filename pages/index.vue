<script setup lang="ts">

definePageMeta({
  layout: "landing",
  name: 'Home'
});
useHead({
  title: 'Lib',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Nuxt Boilerplate v3!'
    }
  ]
});

const { notionGetImages } = useNotion()
const { convertNotionPagesToImageList } = useTools()
const { data } = await notionGetImages()

const images = computed(() => data.value && convertNotionPagesToImageList(data.value.results).filter(item => item.src) || [])

const MODES = {
  FOCUS: 0,
  VIEW: 1
}
const itemHover = ref()
const mode = ref(MODES.FOCUS)

</script>
<template>
  <div>
    <div class="container">
      <div class="gallery">
        <div v-for="(item, index) in images" :key="index" class="gallery-item">
          <NuxtImg loading="lazy" format="webp"
            :class="{ 'not-focus': itemHover !== item.id && itemHover && mode === MODES.FOCUS }" :src="item.src"
            alt="img" @mouseenter="itemHover = item.id" @mouseleave="itemHover = ''" />
        </div>
      </div>
    </div>
  </div>
</template>