<script setup lang="ts">
import { introduce } from '~/__mock__/introduction'
definePageMeta({
  layout: 'document'
})
useHead({
  title: 'Documents'
})

const links = [
  {
    name: 'get-started',
    label: 'Docs'
  },
  {
    name: '',
    label: 'Get started'
  }
]
const INTRODUCE = introduce
</script>

<template>
  <div class="h-full">
      <UBreadcrumb :links="links" />
      <MDC :value="INTRODUCE" tag="article" />
      <NBFeatures />
  </div>
</template>

<style scoped>

</style>