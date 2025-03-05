<template>
  <div class="p-6">
    <h2 class="text-4xl font-bold mb-6 text-center">Tu Carrito</h2>
    <div v-if="backendCart.length === 0" class="text-center text-gray-600 dark:text-gray-300">
      Tu carrito está vacío.
    </div>
    <div v-else class="space-y-4">
      <div v-for="item in backendCart" :key="item.id" class="flex items-center justify-between border-b pb-2">
        <div>
          <h4 class="text-xl font-semibold">{{ item.producto.nombre }}</h4>
          <p class="text-gray-600 dark:text-gray-300">Cantidad: {{ item.cantidad }}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-lg">S/ {{ (item.producto.precio * item.cantidad).toFixed(2) }}</p>
          <button @click="removeItem(item)" class="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline">
            Eliminar
          </button>
        </div>
      </div>
      <div class="mt-6 text-3xl font-bold text-right">
        Total: S/ {{ total.toFixed(2) }}
      </div>
      <div class="flex justify-center mt-8">
        <button class="btn-primary hover:scale-105 transform" @click="checkout">
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'CartView',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(async () => {
      if (!authStore.isLoggedIn) {
        router.push('/login')
        return
      }
      await cartStore.fetchBackendCart()
    })

    const removeItem = async (item: any) => {
      try {
        await axios.delete(import.meta.env.VITE_BACKEND_URL + `/carrito/${item.id}`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        await cartStore.fetchBackendCart()
      } catch (error) {
        console.error(error)
      }
    }

    const checkout = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/ordenes/checkout', {}, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        alert('Orden realizada con éxito. ID: ' + response.data.ordenId)
        await cartStore.fetchBackendCart()
      } catch (error: any) {
        alert(error.response?.data?.message || 'Error en checkout')
      }
    }

    const total = computed(() =>
      cartStore.backendCart.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)
    )

    return {
      backendCart: cartStore.backendCart,
      removeItem,
      checkout,
      total
    }
  }
})
</script>
