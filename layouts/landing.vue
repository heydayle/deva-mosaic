<script setup lang="ts">
import TargetCursor from '~/components/vue-bits/TargetCursor/TargetCursor.vue';
</script>

<template>
<div>
  <div class="fixed z-[1] bottom-24 right-12 flex flex-col space-y-4">
    <NBColorMode />
    <div id="back-to-top" />
  </div>
  <client-only>
    <TargetCursor :spin-duration="0" :hide-default-cursor="true" />
    <LayoutsHeader />
  </client-only>
  <div id="main-layout" >
    <div class="m-auto max-w-[96%] overflow-auto pt-[96px]">
        <NuxtPage />
      </div>
  </div>
</div>
</template>