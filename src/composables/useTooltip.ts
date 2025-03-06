import { ref } from 'vue'
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
