
interface Filter {
    property: string
    [key: string]: any;
}

export const useNotion = () => {
    const NOTION_IMAGE_DB = useRuntimeConfig().public.NOTION_IMAGE_DB
    
    const NOTION_API_URL = '/api/notion/images'
    const OPTIONS_API = {
        method: "POST",
    } as any

    const postNotion = (dbId: string, query?: Filter) => {
        return useFetch(NOTION_API_URL, {
            ...OPTIONS_API,
            body: {
                db_id: dbId,
                query
            }
        })
    }

    const notionGetImages = (qarams?: Filter) => {
        return postNotion(NOTION_IMAGE_DB, qarams)
    }
    return {
        notionGetImages,
    }
}