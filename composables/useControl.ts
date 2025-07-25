import type { SimpleImage } from "~/composables/useTools";

export const useControl = (images: Ref<SimpleImage[]>) => {
  const currentIndex = ref(0);

  const scrollToImage = (index: number) => {
    document.querySelector(`#index-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onBack = (index: number) => {
    currentIndex.value = index - 1;
    if (index - 1 < 0) currentIndex.value = images.value.length - 1;
    const backRoute = { name: "Home", query: { index: currentIndex.value } }
    navigateTo(backRoute);
    scrollToImage(currentIndex.value);
  };
  const onNext = (index: number) => {
    currentIndex.value = index + 1;
    if (index + 1 > images.value.length - 1) currentIndex.value = 0;
    const nextRoute = { name: "Home", query: { index: currentIndex.value } }
    navigateTo(nextRoute);
    scrollToImage(currentIndex.value);
  };
  return {
    scrollToImage,
    onBack,
    onNext
  }
}