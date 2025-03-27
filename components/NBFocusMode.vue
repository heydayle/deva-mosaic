<script setup lang="ts">
import { toast } from 'vue-sonner'

const store = useStore()
const { isFocusing } = storeToRefs(store)

const changeFocusMode = () => {
  store.onFocusMode()
  toast.success(isFocusing.value ? 'Focusing Mode' : 'Gallery Mode')
}

</script>

<template>
  <ClientOnly>
    <UButton
      size="xl"
      color="gray"
      :icon="isFocusing ? 'ph:cube-focus-fill' : 'tabler:layout-collage'"
      :ui="{ rounded: 'rounded-full' }"
      class="mouse-sm"
      @click="changeFocusMode"
    />
  </ClientOnly>
</template>
