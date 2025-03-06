<template>
  <div class="relative overflow-hidden" ref="wrapperRef">
    <!-- Spinner encima (sólo se ve mientras no se ha “activado” la imagen) -->
    <div
      v-if="!loaded"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
    >
      <LoadingSpinner />
    </div>

    <!-- Usamos v-show en lugar de v-if, para que el <img> exista en el DOM y sea observado -->
    <img
      v-show="loaded"
      :src="src"
      :alt="alt"
      class="transition-opacity duration-700 opacity-0"
      @load="onLoad"
      ref="imgRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import LoadingSpinner from './LoadingSpinner.vue'

export default defineComponent({
  name: 'LazyImage',
  components: { LoadingSpinner },
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' }
  },
  setup(props) {
    const loaded = ref(false)
    // Referencia al contenedor para observarlo con IntersectionObserver
    const wrapperRef = ref<HTMLDivElement | null>(null)

    // Cuando el contenedor entre en el viewport, “activamos” la imagen
    const { stop } = useIntersectionObserver(
      wrapperRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          loaded.value = true
          stop() // dejamos de observar
        }
      }
    )

    // Una vez que la imagen se descarga, le quitamos la opacidad 0 para que aparezca
    const onLoad = (event: Event) => {
      const target = event.target as HTMLImageElement
      target.style.opacity = '1'
    }

    return { loaded, wrapperRef, onLoad }
  }
})
</script>
