<script setup lang="ts">
import { useAlert } from '~/composables/useAlert'

const store = useStore()
const { isFocusing } = storeToRefs(store)

const { success } = useAlert()

const changeFocusMode = () => {
  store.onFocusMode()
  success({
    title: isFocusing.value ? 'Focusing Mode' : 'Gallery Mode',
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    position: "top-end",
    icon: "success",
  })
}

</script>

<template>
  <ClientOnly>
    <UButton size="xl" color="gray" :icon="isFocusing ? 'ph:cube-focus-fill' : 'tabler:layout-collage'"
      :ui="{ rounded: 'rounded-full' }" @click="changeFocusMode" />
  </ClientOnly>
</template>
