<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { gsap } from "gsap";

const { app } = useAppConfig()
const colorMode = useColorMode()
const github = app.socials[0]
const { width, height } = useWindowSize()

const refWarning = ref()

const setWarningScreen = () => {
  if (width.value < 768) {
    gsap.fromTo(refWarning.value, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1
    })
  } else
    gsap.to(refWarning.value, { display: 'none' })
}
const closeWarning = () => {
  gsap.to(refWarning.value, {
    opacity: 0,
    scale: 0.8
  })
  gsap.to(refWarning.value, {
    display: 'none',
    delay: 0.5
  })
}
onMounted(() => {
  colorMode.value = 'dark'
  setWarningScreen()
})

</script>
<template>
  <div class="bg-white/20 shadow-lg ring-1 ring-black/5">
    <div class="container p-4 flex justify-between items-center">
      <NBLogo class="flex-1" />
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
    <div ref="refWarning" class="fixed top-1/2 transfrom -translate-y-1/2 p-4 z-[999999] opacity-0 bg-white-50/50 dark:bg-black/90 h-dvh">
      <div class="flex flex-col justify-between w-full rounded-xl overflow-hidden backdrop-blur-2xl px-4 py-8 text-black dark:text-white-50 mx-auto h-dvh">
        <div>
          <NuxtImg src="logo.svg" width="60" />
          <span class="text-[70px]">for the <i>best</i> experience, <span class="text-[70px]"><u>use</u><br> a desktop!</span></span>
        </div>
        <span class="text-[40px] ring ring-white-50 text-center" @click="closeWarning">no problem.</span>
      </div>
    </div>
  </div>
</template>