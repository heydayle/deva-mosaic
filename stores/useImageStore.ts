import { defineStore } from 'pinia'

export const useImageStore = defineStore('useImageStore', () => {
    const currentImages = ref<any[]>([])
    const currentCursor = ref<string | undefined>(undefined)
    
    function setImages(newImages: any[]) {
      currentImages.value = newImages
    }
    function setCursor(newCursor: string) {
      currentCursor.value = newCursor
    }
  
    return { currentImages, currentCursor, setImages, setCursor }
})