<script setup lang="ts">
import TargetCursor from './components/vue-bits/TargetCursor/TargetCursor.vue';

const { app } = useAppConfig()
useHead({
  link: [
    {
      rel: 'canonical',
      href: app.meta.canonical,
    }
  ],
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    },
    {
      name: 'description',
      content: app.meta.description,
    },
    {
      name: 'keywords',
      content: app.meta.keywords,
    },
    {
      name: 'image',
      content: 'https://memories.thinh.io.vn/cover.png',
    },
    {
      name: 'author',
      content: app.meta.author,
    },
    {
      name: 'publisher',
      content: app.meta.publisher,
    },
    {
      name: 'og:title',
      content: app.meta.title,
    },
    {
      name: 'og:description',
      content: app.meta.description,
    },
    {
      name: 'og:image',
      content: 'https://memories.thinh.io.vn/cover.png',
    },
  ],
  script: [{ src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js' }]
})
useHead({
  title: app.meta.title,
  meta: [
    {
      name: 'description',
      content: 'Memories of Thinh'
    }
  ]
});

</script>
<template>
  <div class="">
    <div class="fixed z-[1] bottom-24 right-12 flex flex-col space-y-4">
      <NBColorMode />
      <NBFocusMode />
      <div id="back-to-top" />
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
