<script setup lang="ts">
const route = useRoute()
const { getImageLink } = useTools()

const currentImageFocusing = computed(() => getImageLink(route.query.fileId, route.query.blockId, 3000))
const isOpen = computed(() => !!route.query.fileId)


const { notionGetImages } = useNotion()
const { convertNotionPagesToImageList } = useTools()
const { data } = await notionGetImages()

const images = computed(() => convertNotionPagesToImageList(data.value.results).filter(item => item.src) || [])

</script>
<template>
    <div>
        <UModal v-model="isOpen" fullscreen :ui="{ background: '!bg-transparent' }">
            <NuxtLinkLocale to="/">
                <UIcon color="gray" variant="ghost" name="i-heroicons-x-mark-20-solid" class="-my-1"/>
            </NuxtLinkLocale>
            <div class="max-h-[calc(100vh-100px)] bg-transparent">
                <NuxtImg :src="currentImageFocusing" class="m-auto max-h-[calc(100vh-100px)]" />
            </div>
            <div class="flex space-x-4 max-w-[calc(100vw-80px)] m-auto overflow-x-auto">
                <div v-for="(item, index) in images" :key="index" class="w-[120px]">
                    <NuxtLinkLocale :to="{ path: '/', query: { fileId: item.fileId, blockId: item.id }}" class="block">
                        <NuxtImg
                            :src="item.src"
                            class="mouse-object image-item transition duration-300 w-[120px] block"
                            alt="img"
                            loading="lazy"
                        />
                    </NuxtLinkLocale>
                </div>
            </div>
        </UModal>
    </div>
</template>