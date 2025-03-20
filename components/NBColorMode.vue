<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly>
  <UToggle
    on-icon="i-heroicons-moon-20-solid"
    off-icon="i-heroicons-sun-20-solid"
    size="lg"
    :model-value="isDark"
    @click="isDark = !isDark"
  />
  </ClientOnly>
</template>
