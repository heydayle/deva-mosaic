
interface Filter {
    property?: string
    [key: string]: any;
}

export const useNotion = () => {
    const { convertNotionPagesToImageList } = useTools()
    const imageStore = useImageStore()
    const NOTION_IMAGE_DB = useRuntimeConfig().public.NOTION_IMAGE_DB
    const start_cursor = ref(undefined)
    const results = ref<any>([])
    const allImages = ref<SimpleImage[]>([])
    const indexImage = ref(0)
    
    const NOTION_API_URL = '/api/notion/images'
    const OPTIONS_API = {
        method: "POST",
    } as any

    const postNotion = async (dbId: string, query?: Filter) => {
        const response = await useFetch(NOTION_API_URL, {
            ...OPTIONS_API,
            body: {
                db_id: dbId,
                query: {
                    ...query,
                    start_cursor
                }
            }
        })
        start_cursor.value = response.data.value.next_cursor
        const resResults = response?.data?.value?.results || []
        results.value = [...results.value, ...resResults]
        indexImage.value = allImages.value.length
        const images = convertNotionPagesToImageList(response?.data?.value?.results)
            .filter(item => item.src)
            .map((item, index) => ({ ...item, index: (indexImage.value + index) })) || []

        allImages.value = [...allImages.value, ...images]
        imageStore.setImages(allImages.value)
        return response
    }

    const notionGetImages = (qarams?: Filter) => {
        return postNotion(NOTION_IMAGE_DB, qarams)
    }
    return {
        start_cursor,
        allImages,
        notionGetImages,
    }
}