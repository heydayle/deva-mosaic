<script setup lang="ts">
import { defineProps } from 'vue'
const { app } = useAppConfig()
const title = app.meta.title
const version = app.version

defineProps<{
  withTitle?: boolean
}>()
</script>

<template>
  <div>
      <NuxtLinkLocale to="/" class="flex-1 inline-flex space-x-4 items-center">
        <UIcon name="simple-icons:nuxt" class="text-4xl text-green-500" />
        <template v-if="withTitle">
          <span class="text-xl font-bold">{{ title }}</span>
          <span class="text-[10px] text-primary px-2 py-1 border border-primary rounded-xl">{{ version }}</span>
        </template>
    </NuxtLinkLocale >
  </div>
</template>

<style scoped>

</style>