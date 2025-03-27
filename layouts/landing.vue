<script setup lang="ts">
import { Toaster } from 'vue-sonner'
const colorMode = useColorMode()
const theme = computed(() => colorMode.value) as Partial<'dark' | 'light' | 'system'> | any
</script>

<template>
<div id="main-layout">
  <Toaster richColors :theme="theme" position="top-right"/>
  <LayoutsHeader />
  <div class="m-auto max-w-[96%]">
    <NuxtPage />
  </div>
</div>
</template>