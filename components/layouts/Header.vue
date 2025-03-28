<script setup lang="ts">
const { app } = useAppConfig()
const colorMode = useColorMode()
const github = app.socials[0]

onMounted(() => {
  colorMode.value = 'dark'
})

</script>
<template>
  <div class="bg-white/20 shadow-lg ring-1 ring-black/5">
    <div class="container py-4 flex justify-between items-center">
      <NBLogo with-title class="flex-1" />
      <div class="flex flex-1 justify-end items-center space-x-2">
        <UButton :to="github.href" variant="ghost" color="white" class="text-xl text-white dark:text-white">
          <UIcon :name="github.icon" size="22" class="text-xl"/>
        </UButton>
        <div class="fixed z-[1] bottom-24 right-12 flex flex-col space-y-4">
          <NBColorMode />
          <NBFocusMode />
          <div id="back-to-top" />
        </div>
        <SelectLanguage />
      </div>
    </div>
  </div>
</template>