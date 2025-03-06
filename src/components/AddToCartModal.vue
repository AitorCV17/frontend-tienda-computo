<template>
    <transition name="fade">
      <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999]">
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow-xl w-96 relative">
          <button
            @click="close"
            class="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
          <h2 class="text-xl font-bold mb-4">¡Producto agregado exitosamente!</h2>
          <p class="mb-2">
            Ahora tienes <strong>{{ cartCount }}</strong> producto(s) en tu carrito.
          </p>
          <div class="flex gap-2 mt-6">
            <button
              @click="keepShopping"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded"
            >
              Seguir comprando
            </button>
            <button
              @click="goCheckout"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '../store/cart'
  
  export default defineComponent({
    name: 'AddToCartModal',
    props: {
      visible: { type: Boolean, default: false }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
      const router = useRouter()
      const cartStore = useCartStore()
  
      const cartCount = computed(() =>
        cartStore.backendCart.reduce((acc, item) => acc + item.cantidad, 0)
      )
  
      const close = () => {
        emit('update:visible', false)
      }
  
      const keepShopping = () => {
        close()
      }
  
      const goCheckout = () => {
        close()
        router.push('/checkout')
      }
  
      return {
        cartCount,
        close,
        keepShopping,
        goCheckout
      }
    }
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  