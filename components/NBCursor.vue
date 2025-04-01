<template>
  <div class="h-full">
      <div
          id="cursor-main"
          ref="refCursor"
          :class="cursorClasses"
          class="bg-white p-4 overflow-visible"
          :style="{ transform: 'translate(' + Math.round((outputX - (size/2))) + 'px, ' + Math.round((outputY - (size/2)) + 1) + 'px)', width: size + 'px', height: size + 'px' }"
      >
        <div v-show="isBackHover" class="mt-12 -ml-6">
          <div class="inline-flex items-center space-x-4 text-4xl whitespace-nowrap">
            <UIcon
              name="ic:outline-arrow-back-ios"
              :size="width < 768 ? 16 : 24"
              class="close-button text-white-50 transition duration-300 group-hover:bg-white group-hover:text-black -mt-2"
            />
            <span>{{ $t('previous') }}</span>
          </div>
        </div>
        <div v-show="isNextHover" class="mt-12 -ml-6">
          <div class="inline-flex items-center space-x-4 text-4xl whitespace-nowrap">
            <span>{{ $t('next') }}</span>
            <UIcon
              name="ic:outline-arrow-forward-ios"
              :size="width < 768 ? 16 : 24"
              class="close-button text-white-50 transition duration-300 group-hover:bg-white group-hover:text-black"
            />
          </div>
        </div>
      </div>
      <div v-if="width > 767" ref="refBackPoint" class="back-object" :class="{ 'z-[99999]': isViewer }"/>
      <div v-if="!isViewer && width > 767" ref="refClickToView" class="fixed top-4 left-4 z-[99999] text-6xl bg-black/30 mix-blend-difference pointer-events-none opacity-0">
        click to view!
      </div>
  </div>
  </template>
  
  <script setup>
  
  import { useMouse, watchOnce, useWindowSize, useScroll, useElementBounding } from "@vueuse/core";
  import { gsap } from "gsap";

  const refCursor = ref()
  const currentActiveObject = ref()
  const refBackPoint = ref()
  const refClickToView = ref()
  const refSelectPoint = ref()
  const colorMode = useColorMode()
  const { width } = useWindowSize()

  
  const { x: xBack, y: yBack, bottom: bottomBack } = useElementBounding(refBackPoint)

  watch(xBack, (value) => {
    if (currentActiveObject.value)
      gsap.to(refClickToView.value, {
        opacity: 1,
        x: value,
        y: yBack.value < 20 ? bottomBack.value - 80 : yBack.value
      })
  })


  const isNextHover = ref(false)
  const isBackHover = ref(false)

  const { x, y } = useMouse({
    type: 'client'
  });
  
  // Starting size/position of the cursor
  const startingSize = 22;
  const size = ref(22);
  const outputX = ref(x.value);
  const outputY = ref(y.value);
  
  // Smoothly move the cursor to the mouse position
  gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - 0.3, gsap.ticker.deltaRatio());
    outputX.value += (x.value - outputX.value) * dt;
    outputY.value += (y.value - outputY.value) * dt;
  });
  
  // Hide the cursor until the user moves their mouse
  const isCursorVisible = ref(false);
  const cursorClasses = computed(() => {
    return {
      'cursor d-none d-xl-block': true,
      'cursor--hidden': !isCursorVisible.value,
    }
  });
  watchOnce(x, () => {
    isCursorVisible.value = true;
  })

  const mouseX = ref(0);
  const mouseY = ref(0);
  
  // Check next/back button on preview controller
  const handleHoverControlButton = (target, isOut) => {
    if (!target) return;
    if (target.classList.contains('next-button')) {
      isNextHover.value = true
      isBackHover.value = false
    }
    else if (target.classList.contains('back-button')) {
      isNextHover.value = false
      isBackHover.value = true
    }
    if (isOut) {
      isNextHover.value = false
      isBackHover.value = false
    }
  }

  const setBoundingSelectedObject = (rect) => {
    gsap.to(refSelectPoint.value, {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      borderWidth: isViewer.value ? 2 : 4,
      borderColor: colorMode.value === 'dark' ? 'white' : 'black',
      borderStyle: 'dashed',
      duration: 0.7,
    })
  }
  
  /**
   * Respond to any DOM element with the class of ".mouse-*" by increasing the size of the cursor
   * @param className - The name of the CSS class that we're looking for to make the change
   * @param cursorSize - The size of the cursor when the element is hovered
   */
  const setupMouseEffect = (className, cursorSize) => {
    document.addEventListener('click', e => {
      const isMiniGallery = !!e?.target.parentElement.parentElement.parentElement.classList.contains("mini-gallery")
      const isImage = e?.target.classList.contains("image-item")

      if (isImage && !isMiniGallery) {
        gsap.to(refBackPoint.value,{
          opacity: 0,
          duration: 0.3
        });
      }
    })
    // Update the cursor position when the mouse moves
    document.addEventListener("mousemove", (event) => {
      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
      const isController = event?.target.classList.contains("next-button") || event?.target.classList.contains("back-button")
      const isLeaveGallery = (!event?.target.classList.contains("mouse-object") && !event?.target.classList.contains("gallery") && !event?.target.classList.contains("mini-gallery"))

      handleHoverControlButton(event.target)
      if (isController) {
        gsap.to(size, { duration: 0.2, value: 10 });
      }
      if (isLeaveGallery) {
        gsap.to(refBackPoint.value,{
          duration: 0.7,
          x: mouseX.value,
          y: mouseY.value,
          width: size.value,
          height: size.value
        });
        gsap.to(refCursor.value, {
          opacity: 1,
          duration: 0.5,
        })
        gsap.to(refClickToView.value, {
          opacity: 0,
          duration: 0.2,
        })
      }
      if (!event?.target.classList || !event?.target.classList.contains("mouse-object") && !event.target.classList.contains("gallery")) {
        currentActiveObject.value = null;
      }
      // const imageActive = document.querySelector('#index-' + route.query.index)
      // const rect = imageActive.getBoundingClientRect();
      // setBoundingSelectedObject(rect)
    });
    // Update the cursor position when the user scrolls
    document.addEventListener('scroll', () => {
      const hoveredElement = document.elementFromPoint(mouseX.value, mouseY.value);
      if (hoveredElement && hoveredElement.classList.contains("mouse-object")) {
        const rect = hoveredElement.getBoundingClientRect();
        gsap.to(refBackPoint.value, {
          x: rect.x - 15,
          y: rect.y  - 15,
          width: rect.width + 30,
          height: rect.height + 30,
          duration: 0.6,
        })
        gsap.to(refClickToView.value, {
          opacity: 1,
          x: rect.x,
          y: rect.y < 20 ? rect.bottom - 80 : rect.y,
          duration: 0.7
        })
      }
    });

    // Increase the size of the cursor when the user hovers over an element
    document.body.addEventListener('mouseover', (event) => {
        if (event?.target.classList.contains(className)) {
          const rect = event?.target.getBoundingClientRect();
          gsap.killTweensOf(size);
          gsap.to(size, { duration: 0.2, value: cursorSize  });
          
          if (className === 'close-button') {
            gsap.to(refBackPoint.value, {
              opacity: 0,
              duration: 0.5,
            })
          }
          if (className === 'mouse-object') {
            gsap.to(refCursor.value, {
              opacity: 0,
              duration: 0.5,
            })
            currentActiveObject.value = event.target;
            currentActiveObject.value.classList.add('mouse-active');
            gsap.fromTo(refBackPoint.value, {
              opacity: 1,
              position: 'fixed',
              background: 'transparent',
            }, {
              x: rect.x - 20,
              y: rect.y  - 20,
              width: rect.width + 40,
              height: rect.height + 40,
              borderWidth: isViewer.value ? 2 : 4,
              borderColor: colorMode.value === 'dark' ? 'white' : 'black',
              borderStyle: 'dashed',
              duration: 0.7,
            })
            setTimeout(() => {
              if (currentActiveObject.value?.src === event.target?.src) {
                const rectCurrent = currentActiveObject.value.getBoundingClientRect()
                gsap.to(refBackPoint.value, {
                  x: rectCurrent.x - 10,
                  y: rectCurrent.y - 10,
                  width: rect.width + 20,
                  height: rect.height + 20,
                  duration: 0.7,
                  ease: 'power4.out'
                })
              }
            }, 700)
          }
        }
    });
    document.body.addEventListener('mouseout', (event) => {
      handleHoverControlButton(event?.target, true)
      if (event?.target.classList.contains(className)) {
        gsap.killTweensOf(size);
        gsap.to(size, { duration: 0.2, value: startingSize });
        if (className === 'close-button') {
          gsap.to(refBackPoint.value, {
              opacity: 1,
              duration: 0.5,
            })
        }
      }
    });
  };
  
  onMounted(() => {
    setupMouseEffect('mouse-lg', 200);
    setupMouseEffect('mouse-md', 100);
    setupMouseEffect('mouse-sm', 60);
    setupMouseEffect('mouse-object', 20);
    setupMouseEffect('close-button', 60);
  });
  
  // Reset the cursor size when the route changes
  const route = useRoute();
  const isViewer = computed(() => !!route.query.index?.toString())
  watch(route, () => {
    gsap.killTweensOf(size);
    gsap.to(size, {duration: 0.1, value: startingSize});
  }, {
    flush: 'post',
    deep: true
  });

  const refMiniGallery = ref()
  let intervalCheckMiniGalleryInit

  const setMouseForMiniGallery = (miniGallery) => {
    miniGallery.addEventListener('scroll', () => {
        const hoveredElement = document.elementFromPoint(mouseX.value, mouseY.value);
        if (hoveredElement && hoveredElement.classList.contains("mouse-object")) {
          const rect = hoveredElement.getBoundingClientRect();
          gsap.to(refBackPoint.value, {
            x: rect.x - 15,
            y: rect.y  - 15,
            width: rect.width + 30,
            height: rect.height + 30,
            duration: 0.6,
          })
        }
        // const imageActive = document.querySelector('#index-' + route.query.index)
        // const rect = imageActive.getBoundingClientRect();
        // setBoundingSelectedObject(rect)
      })
  }

  watch(isViewer, (value) => {
    if (value) {
      intervalCheckMiniGalleryInit = setInterval(() => {
        refMiniGallery.value = document.querySelector('#mini-gallery')
      }, 1000)
    } else {
      clearInterval(intervalCheckMiniGalleryInit)
    }
  })
  watch(refMiniGallery, (value) => {
    if (value) {
      clearInterval(intervalCheckMiniGalleryInit)
      setMouseForMiniGallery(value)
    }
  })
  
  </script>
  
  <style lang="scss" scoped>
  
  .cursor {
    position: fixed;
    z-index: 10000;
    border: 2px solid white;
    top: 0;
    left: 0;
    mix-blend-mode: difference;
    backdrop-filter: grayscale(1);
    -webkit-backdrop-filter: grayscale(1);
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  
    &.cursor--hidden {
      opacity: 0;
    }
  }
  
  </style>