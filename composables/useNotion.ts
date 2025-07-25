
interface Filter {
    property?: string
    [key: string]: string | undefined
}

export const useNotion = () => {
    const { convertNotionPagesToImageList } = useTools()
    const imageStore = useImageStore()
    const { currentCursor, isMaxPage } = storeToRefs(imageStore)

    const NOTION_IMAGE_DB = useRuntimeConfig().public.NOTION_IMAGE_DB
    const results = ref<any>([])
    const allImages = ref<SimpleImage[]>([])
    const indexImage = ref(0)

    const NOTION_API_URL = '/api/notion/images'
    const OPTIONS_API: Record<string, string> = {
        method: "POST",
    }

    const postNotion = async (dbId: string, query?: Filter) => {
        // const { data, pending } = await useAsyncData(
        //     dbId,
        //     () => $fetch(NOTION_API_URL, {
        //         ...OPTIONS_API,
        //         body: {
        //             db_id: dbId,
        //             query: { ...query, start_cursor: currentCursor.value || undefined } 
        //         } 
        //     }),
        // )
        // console.log(data);
        
        const { data } = await useFetch(NOTION_API_URL, {
            ...OPTIONS_API,
            body: {
                db_id: dbId,
                query: {
                    ...query,
                    start_cursor: currentCursor.value || undefined
                }
            }
        }) 

        imageStore.setCursor(data?.value?.next_cursor || undefined)
        const resResults = data.value.results || []
        results.value = [...results.value, ...resResults]

        indexImage.value = allImages.value.length
        const images = convertNotionPagesToImageList(data.value?.results)
            .filter(item => item.src)
            .map((item, index) => ({ ...item, index: (indexImage.value + index) })) || []

        allImages.value = [...allImages.value, ...images]
        imageStore.setImages(allImages.value)
        return data
    }

    const notionGetImages = (qarams?: Filter) => {
        return postNotion(NOTION_IMAGE_DB, qarams)
    }
    const notionGetMoreImages = async (cursor: string) => {
        allImages.value = [...imageStore.currentImages]
        const response = await useFetch(NOTION_API_URL, {
            ...OPTIONS_API,
            body: {
                db_id: NOTION_IMAGE_DB,
                query: {
                    start_cursor: cursor || undefined
                }
            }
        })
        imageStore.setCursor(response?.data?.value?.next_cursor || undefined)
        isMaxPage.value = !response?.data?.value?.next_cursor
        const resResults = response?.data.value?.results || []
        results.value = [...results.value, ...resResults]
        indexImage.value = allImages.value.length
        const images = await convertNotionPagesToImageList(resResults)
            .filter(item => item.src)
            .map((item, index) => ({ ...item, index: (indexImage.value + index) })) || []
        allImages.value = [...allImages.value, ...images]
        imageStore.setImages(allImages.value)
    }
    return {
        currentCursor,
        allImages,
        notionGetImages,
        notionGetMoreImages,
    }
}