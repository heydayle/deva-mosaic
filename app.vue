<script setup lang="ts">
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
      content: '/cover.png',
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
      content: '/cover.png',
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
    <client-only>
      <LazyNBCursor/>
      <div id="select-cursor" />
    </client-only>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
