<script setup lang="ts">
const route = useRoute()
const localRoute = useLocaleRoute()

const { getImageLink } = useTools()
const { notionGetImages } = useNotion()
const { convertNotionPagesToImageList } = useTools()
const { data } = await notionGetImages()

const images = computed(() => convertNotionPagesToImageList(data.value.results).filter(item => item.src) || [])
const currentIndex = computed(() => route.query.index && parseInt(route.query.index as string) as number)
const currentImageFocusing = computed(() => {
    const index = parseInt(route.query.index as string) as number
    if (route.query.index) {
        const currentImage = images.value[index]
        return getImageLink(currentImage.fileId, currentImage.id, 3000)
    }
    return ''
})

const isOpen = computed(() => !!route.query.index?.toString())

const onBack = () => {
    const backIndex = currentIndex.value + 1
    const backRoute = localRoute({ name: 'Home', query: { index: backIndex } })
    navigateTo(backRoute)
    
}
const onNext = () => {
    const nextIndex = currentIndex.value + 1
    const nextRoute = localRoute({ name: 'Home', query: { index: nextIndex } })
    navigateTo(nextRoute)
}

</script>
<template>
    <div>
        <UModal v-model="isOpen" fullscreen
            :ui="{ background: '!bg-transparent', overlay: { background: '!bg-gray-200/90 dark:!bg-gray-800/90' } }">
            <div class="relative m-auto max-h-[calc(100vh-32px)] bg-transparent text-center">
                <NuxtImg :src="currentImageFocusing" class="m-auto max-h-[calc(100vh-100px)] rounded-xl" />
                <NuxtLinkLocale to="/"
                    class="close-button absolute bottom-4 left-1/2 transform -translate-x-1/2 !text-white border group hover:bg-white-50 pt-1">
                    <UIcon size="32" name="i-heroicons-x-mark-20-solid"
                        class="close-button -my-1 text-white-50 transition duration-300 group-hover:bg-white group-hover:text-black" />
                </NuxtLinkLocale>
                <div>
                    <UButton class="absolute left-4 top-1/2" color="gray"
                        icon="ic:outline-arrow-back-ios" :ui="{ rounded: 'rounded-full' }" @click="onBack" />
                    <UButton class="absolute right-4 top-1/2" color="gray"
                        icon="ic:outline-arrow-forward-ios" :ui="{ rounded: 'rounded-full' }" @click="onNext" />
                </div>
            </div>
            <div
                class="fixed right-0 top-0 m-auto p-4 max-w-[600px] h-screen overflow-y-auto bg-white/80 border-l border-l-black dark:bg-black/80">
                <div class="flex flex-col items-center space-y-4 w-full">
                    <div v-for="(item, index) in images" :key="index" class="w-[200px]">
                        <NuxtLinkLocale :to="{ path: '/', query: { index } }" class="w-[200px] block">
                            <NuxtImg :src="item.src"
                                class="mouse-object image-item transition duration-300 block duration-600"
                                :class="{ 'filter saturate-[0]': parseInt(route.query.index as string) === index }"
                                alt="img" loading="lazy" />
                        </NuxtLinkLocale>
                    </div>
                </div>
            </div>
        </UModal>
    </div>
</template>