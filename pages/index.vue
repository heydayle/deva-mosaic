<script setup lang="ts">

definePageMeta({
  layout: "landing",
  name: 'Home'
});
useHead({
  title: 'Kickstart Nuxt 🚀',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Nuxt Boilerplate v3!'
    }
  ]
});

</script>
<template>
  <NBWelcome />
</template>