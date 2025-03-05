<template>
  <div class="relative overflow-hidden">
    <div v-if="!loaded" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <LoadingSpinner />
    </div>
    <img v-if="loaded" :src="src" :alt="alt" class="transition-opacity duration-700 opacity-0" @load="onLoad" ref="imgRef" />
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
    const imgRef = ref<HTMLImageElement | null>(null)

    const { stop } = useIntersectionObserver(
      imgRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          loaded.value = true
          stop()
        }
      }
    )

    const onLoad = (event: Event) => {
      const target = event.target as HTMLImageElement
      target.style.opacity = '1'
    }

    return { loaded, imgRef, onLoad }
  }
})
</script>
