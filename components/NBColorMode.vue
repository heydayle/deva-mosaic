<script setup lang="ts">
import GlassSurface from './vue-bits/GlassSurface/GlassSurface.vue'

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
    <GlassSurface
      :width="44"
      :height="44"
      :border-radius="100"
    >
      <UButton
        class="cursor-target"
        size="xl"
        color="gray"
        variant="link"
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        :ui="{ rounded: 'rounded-full', icon: { base: 'flex-shrink-0 close-button' } }"
        @click="isDark = !isDark"
      />
    </GlassSurface>
  </ClientOnly>
</template>
