<script setup lang="ts">
definePageMeta({
  layout: 'document'
})
const links = [
  {
    name: 'get-started',
    label: 'Docs'
  },
  {
    name: 'get-started-configuration',
    label: 'Configuration'
  }
]
</script>
<template>
    <div>
      <UBreadcrumb :links="links" />
    </div>
</template>