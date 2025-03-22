<script setup lang="ts">
import { defineProps } from 'vue'
import { useWindowSize } from "@vueuse/core";
const { app } = useAppConfig()
const title = app.meta.title
const version = app.version

const { width } = useWindowSize()
const titleSplit = computed(() => title.split(' ')[0])

defineProps<{
  withTitle?: boolean
}>()
</script>

<template>
  <div>
      <NuxtLinkLocale to="/" class="flex-1 inline-flex space-x-4 items-center">
        <img src="/logo.svg" alt="library-icon" class="w-8 h-8">
        <template v-if="withTitle">
          <span class="text-xl font-bold">{{ width < 768 ? titleSplit : title }}</span>
          <span class="text-[10px] text-primary px-2 py-1 border border-primary rounded-xl">{{ version }}</span>
        </template>
    </NuxtLinkLocale >
  </div>
</template>

<style scoped>

</style>