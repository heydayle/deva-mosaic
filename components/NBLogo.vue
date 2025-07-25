<script setup lang="ts">
import { defineProps } from 'vue'

const { app } = useAppConfig()
const version = app.version

defineProps<{
  withTitle?: boolean
}>()
</script>

<template>
  <div>
      <NuxtLinkLocale to="/" class="close-button flex-1 inline-flex space-x-4 items-center">
        <img src="/logo-text.svg" alt="library-icon" class="cursor-target h-12">
        <template v-if="withTitle">
          <span class="text-[10px] text-primary px-2 py-1 border border-primary rounded-xl">{{ version }}</span>
        </template>
    </NuxtLinkLocale >
  </div>
</template>

<style scoped>

</style>
