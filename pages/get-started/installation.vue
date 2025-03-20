<script setup lang="ts">
import { installation } from '~/__mock__/installation'
definePageMeta({
  layout: 'document'
})
useHead({
  title: 'Installation',
  meta: [
    {
      name: 'description',
      content: 'Installation guide for Nuxt Boilerplate v3'
    }
  ]
})
const links = [
  {
    name: 'get-started',
    label: 'Docs'
  },
  {
    name: 'get-started-installation',
    label: 'Installation'
  }
]
</script>
<template>
    <div class="h-full">
      <UBreadcrumb :links="links" />
      <MDC :value="installation" tag="article" />
    </div>
</template>