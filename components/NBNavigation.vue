<script setup lang="ts">
const { app } = useAppConfig();
const navigation = app.headers.navigation;

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const baseName = computed(() => getRouteBaseName(route) as string)
const isExtract = (name: string) => baseName.value.includes(name)
</script>

<template>
  <div>
    <div class="w-full flex justify-end mr-6">
      <ul class="flex items-center space-x-4">
        <NuxtLinkLocale v-for="(item) in navigation" :key="item.name" :to="item.name" :class="{ 'router-link-active': isExtract(item.name) }">
          <span>{{ $t(item.label) }}</span>
        </NuxtLinkLocale>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>