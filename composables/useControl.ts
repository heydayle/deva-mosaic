import type { SimpleImage } from "~/composables/useTools";

export const useControl = (images: SimpleImage[]) => {
  const localeRoute = useLocaleRoute()
  const currentIndex = ref(0);

  const scrollToImage = (index: number) => {
    document.querySelector(`#index-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onBack = (index: number) => {
    console.log(index);
    
    currentIndex.value = index - 1;
    if (index - 1 < 0) currentIndex.value = images.length - 1;
    const backRoute = localeRoute({ name: "Home", query: { index: currentIndex.value } });
    navigateTo(backRoute);
    scrollToImage(currentIndex.value);
  };
  const onNext = (index: number) => {
    currentIndex.value = index + 1;
    if (index + 1 > images.length - 1) currentIndex.value = 0;
    const nextRoute = localeRoute({ name: "Home", query: { index: currentIndex.value } });
    navigateTo(nextRoute);
    scrollToImage(currentIndex.value);
  };
  return {
    scrollToImage,
    onBack,
    onNext
  }
}