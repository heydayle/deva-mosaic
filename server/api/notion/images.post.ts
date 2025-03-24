
export default defineEventHandler(async (event) => {
    const NOTION_SECRET_KEY = useRuntimeConfig().public.NOTION_SECRET_KEY

    const body = await readBody(event)
    const filter = body.query

    try {
        return await $fetch('https://api.notion.com/v1/databases/' + body.db_id + '/query', {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + NOTION_SECRET_KEY,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json"
            },
            body: {
                ...filter
            }
        })
    }
    catch (error) {
        console.log(error);

        return error
    }
})