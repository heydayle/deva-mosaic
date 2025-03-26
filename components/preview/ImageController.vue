<script setup lang="ts">
import { gsap } from "gsap";
import { useWindowSize } from "@vueuse/core"

const route = useRoute();
const localRoute = useLocaleRoute();
const { width } = useWindowSize()

const { notionGetImages } = useNotion();
const { convertNotionPagesToImageList } = useTools();
const { data } = await notionGetImages();
const isCurrentLoaded = ref(false);

const images = computed(
  () =>
    convertNotionPagesToImageList(data.value.results).filter(
      (item) => item.src
    ) || []
);
const currentIndex = computed(() => Number.parseInt(route.query.index));
const currentImageFocusing = computed(() => {
  const index = Number.parseInt(route.query.index as string) as number;
  return images.value[index];
});

watch(currentIndex, () => {
  isCurrentLoaded.value = false;
});

const isOpen = computed(
  () => !!route.query.index?.toString() && !!currentImageFocusing.value
);
const refImageAnimate = ref();

const currentImageLoaded = () => {
  isCurrentLoaded.value = true;
  gsap.to(refImageAnimate.value, {
    opacity: 0,
  });
};
const scrollToImage = (index: number) => {
  document
    .querySelector(`#index-${index}`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
};
const onBack = () => {
  let backIndex = currentIndex.value - 1;
  if (backIndex < 0) backIndex = images.value.length - 1;
  const backRoute = localRoute({ name: "Home", query: { index: backIndex } });
  navigateTo(backRoute);
  scrollToImage(backIndex);
};
const onNext = () => {
  let nextIndex = currentIndex.value + 1;
  if (nextIndex > images.value.length - 1) nextIndex = 0;
  const nextRoute = localRoute({ name: "Home", query: { index: nextIndex } });
  navigateTo(nextRoute);
  scrollToImage(nextIndex);
};

const count = ref(0);

const imageIsReady = () => {
  if (count.value < images.value.length) {
    count.value++;
  } else {
    scrollToImage(currentIndex.value);
  }
};
</script>
<template>
  <div>
    <UModal
      v-model="isOpen"
      fullscreen
      :ui="{
        background: '!bg-transparent',
        overlay: { background: '!bg-gray-200/90 dark:!bg-gray-800/90' },
      }"
    >
      <div v-if="currentImageFocusing" class="grid xs:grid-cols-1 md:grid-cols-[1fr,400px] my-auto p-2 md:p-0">
        <div class="relative">
          <div
            class="relative mt-20 md:mt-auto m-auto h-[calc(100vh-120px)] bg-transparent text-center"
          >
            <NuxtImg
              v-if="!isCurrentLoaded"
              ref="refImageAnimate"
              :src="currentImageFocusing.srcLoading"
              class="absolute inset-0 m-auto h-[calc(100vh-120px)] rounded-xl"
            />
            <NuxtImg
              v-show="isCurrentLoaded"
              :src="currentImageFocusing.preview"
              class="m-auto rounded-xl max-h-[calc(100vh-120px)]"
              @load="currentImageLoaded"
            />
          </div>
          <div>
            <NuxtLinkLocale
              to="/"
              class="close-button absolute top-4 right-4 z-10 transform -translate-x-1/2 !text-white border group hover:bg-white-50 pt-1"
            >
              <UIcon
                size="32"
                name="i-heroicons-x-mark-20-solid"
                class="close-button text-white-50 -mb-1 transition duration-300 group-hover:bg-white group-hover:text-black"
              />
            </NuxtLinkLocale>
            <UButton
              class="close-button h-[calc(100vh-32px)] absolute left-0 top-0 md:p-4"
              color="gray"
              :ui="{ base: '!ring-0 !bg-transparent dark:!bg-transparent target:!bg-transparent' }"
              :size="width < 768 ? 'xs' : 'xl'"
              @click="onBack"
            >
              <UIcon
                name="ic:outline-arrow-back-ios"
                :size="width < 768 ? 16 : 24"
                class="close-button text-white-50 transition duration-300 group-hover:bg-white group-hover:text-black"
              />
            </UButton>
            <UButton
              class="close-button h-[calc(100vh-32px)] absolute right-0 top-0 md:p-4"
              color="gray"
              :ui="{ base: '!ring-0 !bg-transparent dark:!bg-transparent target:!bg-transparent' }"
              :size="width < 768 ? 'xs' : 'xl'"
              @click="onNext"
            >
              <UIcon
                name="ic:outline-arrow-forward-ios"
                :size="width < 768 ? 16 : 24"
                class="close-button text-white-50 transition duration-300 group-hover:bg-white group-hover:text-black"
              />
            </UButton>
          </div>
        </div>
      </div>
      <div
        class="fixed bottom-0 left-0 md:right-0 md:!left-[unset] md:!bottom-[unset] md:top-0 m-auto p-4 max-w-[600px] h-[120px] md:!h-screen overflow-y-auto bg-white/80 border-l border-l-black dark:bg-black/80"
      >
        <div
          class="flex md:flex-col items-center space-x-4 md:space-y-4 md:space-x-0 w-full"
        >
          <div v-for="(item, index) in images" :key="index" class="xs:w-[50px] md:w-[200px]">
            <NuxtLinkLocale
              :to="{ path: '/', query: { index } }"
              class="w-[50px] md:!w-[200px] block"
            >
              <NuxtImg
                :id="'index-' + index"
                :src="item.src"
                :class="{ 'filter saturate-[0]': parseInt(route.query.index as string) === index }"
                class="mouse-object image-item transition duration-300 block duration-600"
                alt="img"
                loading="lazy"
                @load="imageIsReady"
              />
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
