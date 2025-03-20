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
  ]
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
