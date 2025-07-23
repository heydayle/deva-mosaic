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
    <UButton
      class="cursor-target"
      size="xl"
      color="gray"
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      :ui="{ rounded: 'rounded-full', icon: { base: 'flex-shrink-0 close-button' } }"
      @click="isDark = !isDark"
    />
  </ClientOnly>
</template>
