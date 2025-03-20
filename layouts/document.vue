<script setup lang="ts">
const { app } = useAppConfig()
const sidebar = app.documents.sidebars
</script>

<template>
<div>
  <LayoutsHeader />
  <div class="container m-auto">
    <div class="grid grid-cols-[200px,1fr] p-4">
      <LayoutsSidebar :sidebar-items="sidebar" />
      <div class="max-h-[calc(100vh-120px)] overflow-y-auto px-4">
        <NuxtPage />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>