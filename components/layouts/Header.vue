<script setup lang="ts">
const { app } = useAppConfig()
const github = app.socials[0]
</script>
<template>
  <div class="bg-white/20 shadow-lg ring-1 ring-black/5">
    <div class="container py-4 flex justify-between items-center">
      <NBLogo with-title class="flex-1" />
      <div>
        <NBNavigation />
      </div>
      <div class="flex flex-1 justify-end items-center space-x-2">
        <UButton :to="github.href" variant="ghost" color="white" class="text-xl text-white dark:text-white">
          <UIcon :name="github.icon" size="22" class="text-xl"/>
        </UButton> 
        <NBColorMode />
        <SelectLanguage />
      </div>
    </div>
  </div>
</template>