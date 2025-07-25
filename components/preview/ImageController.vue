<script setup lang="ts">
import { useWindowSize, useIntersectionObserver } from "@vueuse/core"
import { UseDocumentVisibility } from "@vueuse/components"
import { useTemplateRef } from 'vue'
import GlassSurface from "../vue-bits/GlassSurface/GlassSurface.vue";

const props = defineProps<{
  images: SimpleImage[]
  currentCursor?: string
  isLoadingMore?: boolean
}>()
const emit = defineEmits<{
  (e: 'loadMore'): void
}>()

const route = useRoute();
const { gtag } = useGtag()
const { width } = useWindowSize()

const isCurrentLoaded = ref(false);

const currentIndex = computed(() => route.query.index ? Number.parseInt(route.query.index as string) : 0);
const refImages = ref(props.images || []);

const { scrollToImage, onBack, onNext } = useControl(refImages);
defineShortcuts({
  'arrowright': () => onNext(currentIndex.value),
  'arrowdown': () => onNext(currentIndex.value),
  'arrowleft': () => onBack(currentIndex.value),
  'arrowup': () => onBack(currentIndex.value),
})

const currentImageFocusing = computed(() => {
  const index = Number.parseInt(route.query.index as string);
  return props.images[index];
});

watch(currentIndex, (value) => {
  isCurrentLoaded.value = false;
  if (value.toString()) {
    gtag('event', 'page_view', {
      page_title: `Gallery${route.query.index ?  ' - Image ' + route.query.index : ''}`,
    })
  }
});

const isOpen = computed(
  () => !!route.query.index && !!currentImageFocusing.value
);
// const currentImageLoaded = () => {
//   isCurrentLoaded.value = true;
//   nextTick(() => {
//     const element = document.querySelector('#index-' + currentIndex.value);
//     if (element) {
//       gsap.to(element, {
//         position: 'relative',
//         zIndex: 999,
//       });
//     }
//   });
// };
const countReady = ref(0);
const imageIsReady = (visibility: string) => {
  if (visibility === "visible" && countReady.value < currentIndex.value) {
    countReady.value++;
    scrollToImage(currentIndex.value);
  }
};

// const setBoundingSelectedObject = () => {
//   const index = Number.parseInt(route.query.index as string) as number;
//   const element = document.querySelector('#index-' + index);
//   if (!element) return
//   const rect = element.getBoundingClientRect();
//   gsap.to(element, {
//     position: 'relative',
//     zIndex: 999,
//   })
//   gsap.to(refSelectPoint.value, {
//     x: rect.x - 10,
//     y: rect.y - 10,
//     width: rect.width + 20,
//     height: rect.height + 20,
//     borderWidth: isOpen.value ? 2 : 4,
//     borderColor: colorMode.value === 'dark' ? 'white' : 'black',
//     borderStyle: 'dashed',
//     duration: 0.7,
//   })
// }

const refLoadmore = useTemplateRef<HTMLDivElement>('refLoadmore')

const { stop } = useIntersectionObserver(
  refLoadmore,
  async ([entry]) => {
    if (entry?.isIntersecting) {
      emit('loadMore');
    }
  },
)
</script>
<template>
  <div>
    <UModal
      v-model="isOpen"
      fullscreen
      :ui="{
        background: '!bg-transparent',
        overlay: { background: '!bg-gray-200/80 dark:!bg-gray-800/90 backdrop-blur-xl' },
        fullscreen: 'w-screen !h-[calc(100vh-100px)] md:!h-screen',
        container: 'flex min-h-[calc(100vh-90px)] md:!min-h-full items-end sm:items-center justify-center text-center'
      }"
    >
      <div v-if="currentImageFocusing" class="grid xs:grid-cols-1 md:grid-cols-[1fr,280px] my-auto p-2 md:p-0">
        <div class="relative w-full">
          <div
            class="relative m-auto md:!h-[calc(100vh-130px)] bg-transparent text-center"
          >
            <NuxtImg
              :src="currentImageFocusing.preview"
              provider="notion"
              class="m-auto transition duration-300 rounded-xl max-h-[calc(100vh-160px)] md:!max-h-[calc(100vh-120px)]"
              :custom="true"
              loading="lazy"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <img
                v-if="isLoaded"
                v-bind="imgAttrs"
                fetchPriority="high"
                :src="src"
              >
              <div v-if="!isLoaded" class="relative">
                <UIcon
                  name="line-md:loading-loop"
                  size="48"
                  class="absolute top-1/2 left-1/2 tranform -translate-x-1/2 text-white"
                />
                <img
                  preload
                  :src="currentImageFocusing.srcLoading"
                  alt="placeholder"
                  class="m-auto h-[calc(100vh-160px)] md:!h-[calc(100vh-120px)] rounded-xl"
                >
              </div>
            </NuxtImg>
          </div>
          <div class="cursor-none">
            <div class="fixed md:!absolute top-4 right-4 z-10 transform -translate-x-1/2 flex flex-col items-center space-y-4">
              <NuxtLink
                to="/"
                class="!text-white-50 text-4xl group"
                title="Close Preview"
              >
                <UIcon name="flowbite:close-outline" class="cursor-target close-button" />
              </NuxtLink>
              <NuxtLink
                :to="currentImageFocusing.preview"
                target="_blank"
                class="!text-white-50 text-4xl group"
                title="Download Image"
              >
                <UIcon name="ph:download-simple" class="cursor-target close-button" />
              </NuxtLink>
              <NBColorMode />
            </div>
            <UButton
              class="close-button back-button h-[calc(100vh-250px)] md:!h-[calc(100vh-100px)] absolute left-0 top-0 md:p-4 w-1/2 cursor-none"
              color="gray"
              variant="ghost"
              :ui="{ base: '!ring-0 !bg-transparent dark:!bg-transparent target:!bg-transparent !shadow-none' }"
              :size="width < 768 ? 'xs' : 'xl'"
              @click="onBack(currentIndex)"
            />
            <UButton
              class="close-button next-button h-[calc(100vh-250px)] md:!h-[calc(100vh-100px)] absolute right-0 top-0 md:p-4 w-1/2 cursor-none"
              color="gray"
              variant="ghost"
              :ui="{ base: '!ring-0 !bg-transparent dark:!bg-transparent target:!bg-transparent' }"
              :size="width < 768 ? 'xs' : 'xl'"
              @click="onNext(currentIndex)"
            />
          </div>
        </div>
      </div> 
     <div
        id="mini-gallery"
        ref="refMiniGallery"
        class="mini-gallery fixed bottom-0 left-0 md:right-0 md:!left-[unset] md:!bottom-[unset] md:top-0 m-auto p-4 w-screen md:!w-unset md:!max-w-[220px] h-[140px] md:!h-screen overflow-x-auto overflow-y-auto border-l border-l-black"
      >
        <!-- <GlassSurface
        :border-radius="0"
        :blur="20"
        :displace="3.8"
        :distortion-scale="10"
        :saturation="0.8"
        :brightness="90"
           class-name="w-screen md:!w-unset md:!max-w-[220px] h-[140px] md:!h-screen overflow-x-auto overflow-y-auto border-l border-l-black"
        > -->
        <div class="mini-gallery flex md:flex-col items-center space-x-4 md:space-y-4 md:space-x-0 w-full">
          <div v-for="(item, index) in images" :key="index" class="xs:w-[50px] md:w-[128px]">
              <NuxtLink
                :to="{ path: '/', query: { index } }"
                class="w-[50px] md:!w-[128px] block"
              >
                <UseDocumentVisibility v-slot="{ visibility }">
                    <NuxtImg
                      :id="'index-' + index"
                      :src="item.img"
                      :class="{ 'filter saturate-[0]': parseInt(route.query.index as string) === index }"
                      class="cursor-target w-full transition duration-300 block duration-600"
                      width="50 md:128"
                      alt="img"
                      @load="imageIsReady(visibility)"
                    />
                </UseDocumentVisibility>
              </NuxtLink>
              <div v-if="index === images.length - 1" ref="refLoadmore" />
          </div>
          <div class="mt-4 text-center">
            <UIcon v-show="isLoadingMore" size="32" name="line-md:downloading-loop" />
          </div>
        </div>
        <!-- </GlassSurface> -->
      </div> 
    </UModal>
  </div>
</template>
