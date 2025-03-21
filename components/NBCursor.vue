<template>
  <div class="h-full">
      <div
          ref="refCursor"
          :class="cursorClasses"
          class="bg-white"
          :style="{ transform: 'translate(' + Math.round((outputX - (size/2))) + 'px, ' + Math.round((outputY - (size/2)) + 1) + 'px)', width: size + 'px', height: size + 'px' }"
      />
      <div ref="refBackPoint" class="back-object" />
  </div>
  </template>
  
  <script setup>
  
  import {useMouse, watchOnce} from "@vueuse/core";
  import {gsap} from "gsap";

  const refCursor = ref()
  const refBackPoint = ref()

  const {x, y} = useMouse({
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


  
  /**
   * Respond to any DOM element with the class of ".mouse-*" by increasing the size of the cursor
   * @param className - The name of the CSS class that we're looking for to make the change
   * @param cursorSize - The size of the cursor when the element is hovered
   */
  const setupMouseEffect = (className, cursorSize) => {
    document.body.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains(className)) {
          const rect = event.target.getBoundingClientRect();
          gsap.killTweensOf(size);
          gsap.to(size, { duration: 0.2, value: cursorSize  });
          if (className === 'mouse-object') {
            gsap.fromTo(refBackPoint.value, {
              position: 'fixed',
              background: '#FFFFFF',
            }, {
              x: rect.x - 15,
              y: rect.y  - 15,
              width: rect.width + 30,
              height: rect.height + 30,
              duration: 0.7,
            })
          }

        }
    });
    document.body.addEventListener('mouseout', (event) => {
      if (event.target.classList.contains(className)) {
        gsap.killTweensOf(size);
        gsap.to(size, {duration: 0.2, value: startingSize});
      }
    });
  };
  
  onMounted(() => {
    setupMouseEffect('mouse-lg', 200);
    setupMouseEffect('mouse-md', 100);
    setupMouseEffect('mouse-sm', 60);
    setupMouseEffect('mouse-object', 20);
  });
  
  // Reset the cursor size when the route changes
  const route = useRoute();
  watch(route, () => {
    gsap.killTweensOf(size);
    gsap.to(size, {duration: 0.1, value: startingSize});
  }, {
    flush: 'post',
    deep: true
  });
  
  
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