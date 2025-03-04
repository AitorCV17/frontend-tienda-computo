<!-- src/components/PopupNotification.vue -->
<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed bottom-4 right-4 z-50 bg-curious-blue-600 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2 dark:bg-gray-800"
    >
      <i v-if="icon" :class="icon" class="text-xl"></i>
      <span>{{ message }}</span>
      <button @click="close" class="ml-4 hover:text-gray-300">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'PopupNotification',
  props: {
    message: { type: String, required: true },
    type: { type: String, default: 'success' },
    duration: { type: Number, default: 3000 },
    icon: { type: String, default: '' }
  },
  setup(props) {
    const visible = ref(true)
    const close = () => {
      visible.value = false
    }
    onMounted(() => {
      setTimeout(() => close(), props.duration)
    })
    return { visible, close }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
