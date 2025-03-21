import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
    const isFocusing = ref(false)
    
    function onFocusMode() {
      isFocusing.value = !isFocusing.value
    }
  
    return { isFocusing, onFocusMode }
})