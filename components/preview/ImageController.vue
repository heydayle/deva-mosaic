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
        <UModal v-model="isOpen" fullscreen :ui="{ background: '!bg-transparent', overlay: { background: '!bg-gray-200/90 dark:!bg-gray-800/90' } }">
            <div class="relative m-auto max-h-[calc(100vh-32px)] bg-transparent text-center">
                <NuxtImg :src="currentImageFocusing" class="m-auto max-h-[calc(100vh-100px)] rounded-xl" />
                <NuxtLinkLocale to="/" class="close-button absolute bottom-4 left-1/2 transform -translate-x-1/2 !text-white border group hover:bg-white-50 pt-1">
                    <UIcon size="32" name="i-heroicons-x-mark-20-solid" class="close-button -my-1 text-white-50 transition duration-300 group-hover:bg-white group-hover:text-black"/>
                </NuxtLinkLocale>
            </div>
            <div class="fixed right-0 top-0 m-auto p-4 max-w-[600px] h-screen overflow-y-auto bg-white/80 border-l border-l-black dark:bg-black/80">
                <div class="flex flex-col items-center space-y-4 w-full">
                    <div v-for="(item, index) in images" :key="index" class="w-[200px]">
                        <NuxtLinkLocale :to="{ path: '/', query: { fileId: item.fileId, blockId: item.id }}" class="w-[200px] block">
                            <NuxtImg
                                :src="item.src"
                                class="mouse-object image-item transition duration-300 block duration-600"
                                :class="{ 'filter saturate-[0]': route.query.fileId === item.fileId }"
                                alt="img"
                                loading="lazy"
                            />
                        </NuxtLinkLocale>
                    </div>
                </div>
            </div>
        </UModal>
    </div>
</template>