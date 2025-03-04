import { ref, onMounted, onUnmounted } from 'vue'
import { useElementBounding } from '@vueuse/core'

export function useTooltip() {
  const tooltipText = ref('')
  const visible = ref(false)
  const targetRef = ref<HTMLElement | null>(null)
  const { left, top, width, height } = useElementBounding(targetRef)

  const showTooltip = (text: string) => {
    tooltipText.value = text
    visible.value = true
  }
  const hideTooltip = () => {
    visible.value = false
  }

  // Ejemplo: Podrías posicionar un tooltip usando left, top, etc.
  // o manipular el DOM con un portal.

  return {
    tooltipText,
    visible,
    targetRef,
    left,
    top,
    width,
    height,
    showTooltip,
    hideTooltip
  }
}
