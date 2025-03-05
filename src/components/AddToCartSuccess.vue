<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-2"
    >
      <i class="fa-solid fa-check text-xl"></i>
      <div>
        <p class="font-bold">¡Producto agregado exitosamente!</p>
        <p class="text-sm">Ahora tienes {{ cartCount }} producto(s) en tu carrito.</p>
      </div>
      <button @click="close" class="ml-4 hover:text-gray-300">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useCartStore } from '../store/cart'

export default defineComponent({
  name: 'AddToCartSuccess',
  props: {
    duration: { type: Number, default: 3000 } // tiempo de desaparición
  },
  setup(props) {
    const visible = ref(true)
    const cartStore = useCartStore()

    const cartCount = computed(() => cartStore.backendCart.reduce((acc, item) => acc + item.cantidad, 0))

    const close = () => {
      visible.value = false
    }
    onMounted(() => {
      setTimeout(() => close(), props.duration)
    })
    return { visible, close, cartCount }
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
