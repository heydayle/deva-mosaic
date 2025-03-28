import { defineStore } from 'pinia'

export const useImageStore = defineStore('useImageStore', () => {
    const currentImages = ref<any[]>([])
    
    function setImages(newImages: any[]) {
      currentImages.value = newImages
    }
  
    return { currentImages, setImages }
})