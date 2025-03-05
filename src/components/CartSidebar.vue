<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click.self="closeSidebar">
    <div class="absolute right-0 top-0 bg-white dark:bg-gray-800 w-80 h-full shadow-2xl p-4 flex flex-col z-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold">Tu Carrito</h3>
        <button @click="closeSidebar" class="text-gray-600 dark:text-gray-300">
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto space-y-4">
        <div v-for="item in cartStore.backendCart" :key="item.id" class="border-b pb-2">
          <p class="font-semibold">{{ item.producto.nombre }}</p>
          <img
            :src="item.producto.imagen || fallbackImg"
            alt="Producto"
            class="w-16 h-16 object-cover my-2"
          />
          <p class="text-sm text-gray-500 dark:text-gray-400">Cantidad: {{ item.cantidad }}</p>
          <p class="text-sm">Subtotal: S/. {{ (item.producto.precio * item.cantidad).toFixed(2) }}</p>
        </div>
        <div v-if="cartStore.backendCart.length === 0" class="text-center text-gray-500 dark:text-gray-400">
          Carrito vacío
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center justify-between text-lg font-bold">
          <span>Total:</span>
          <span>S/. {{ total.toFixed(2) }}</span>
        </div>
        <div class="mt-4 space-y-2">
          <router-link
            to="/cart"
            class="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded"
            @click="closeSidebar"
          >
            Ver Carrito
          </router-link>
          <router-link
            to="/checkout"
            class="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
            @click="closeSidebar"
          >
            Pagar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useCartStore } from '../store/cart'

export default defineComponent({
  name: 'CartSidebar',
  props: {
    isOpen: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const cartStore = useCartStore()
    const fallbackImg = 'https://via.placeholder.com/100'

    const total = computed(() =>
      cartStore.backendCart.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)
    )

    const closeSidebar = () => {
      emit('close')
    }

    return {
      cartStore,
      fallbackImg,
      total,
      isOpen: props.isOpen,
      closeSidebar
    }
  }
})
</script>
