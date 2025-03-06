<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Mi Carrito</h1>
    <div v-if="cartStore.backendCart.length === 0" class="text-center text-gray-600 dark:text-gray-300">
      Tu carrito está vacío.
    </div>
    <div v-else class="flex flex-col lg:flex-row gap-6">
      <!-- Sección Items del Carrito -->
      <div class="w-full lg:w-3/4 space-y-4">
        <table class="w-full text-left border-separate [border-spacing:0.5rem]">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3">Producto</th>
              <th class="p-3">Precio</th>
              <th class="p-3">Cantidad</th>
              <th class="p-3">Subtotal</th>
              <th class="p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cartStore.backendCart"
              :key="item.id"
              class="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td class="p-3 flex items-center space-x-3">
                <img
                  :src="item.producto.imagen || fallbackImg"
                  alt="Producto"
                  class="w-16 h-16 object-cover rounded"
                />
                <span class="font-medium">{{ item.producto.nombre }}</span>
              </td>
              <td class="p-3">
                S/ {{ item.producto.precio.toFixed(2) }}
              </td>
              <td class="p-3">
                <input
                  type="number"
                  min="1"
                  class="w-16 border rounded px-2 dark:bg-gray-700 dark:text-gray-200"
                  v-model.number="updatedQuantities[item.id]"
                  @change="updateQuantity(item)"
                />
              </td>
              <td class="p-3 font-semibold">
                S/ {{ (item.producto.precio * item.cantidad).toFixed(2) }}
              </td>
              <td class="p-3 text-right">
                <button
                  @click="removeItem(item)"
                  class="text-red-600 dark:text-red-400 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Sección Resumen -->
      <div class="w-full lg:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 rounded space-y-4 h-fit">
        <h2 class="text-xl font-semibold mb-2">Resumen</h2>
        <div class="flex justify-between">
          <span class="font-medium">Subtotal</span>
          <span>S/ {{ subtotal.toFixed(2) }}</span>
        </div>
        <!-- Ejemplo: Envío fijo -->
        <div class="flex justify-between">
          <span class="font-medium">Envío</span>
          <span>S/ 10.00</span>
        </div>
        <hr />
        <div class="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>S/ {{ (subtotal + 10).toFixed(2) }}</span>
        </div>
        <button
          class="w-full btn-primary hover:scale-105 transform mt-4"
          @click="checkout"
        >
          Pagar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive } from 'vue'
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
    const fallbackImg = 'https://via.placeholder.com/100'

    const updatedQuantities = reactive<{ [key: number]: number }>({})

    onMounted(async () => {
      if (!authStore.isLoggedIn) {
        router.push('/login')
        return
      }
      await cartStore.fetchBackendCart()
      // Inicializa la cantidad modificable
      cartStore.backendCart.forEach(item => {
        updatedQuantities[item.id] = item.cantidad
      })
    })

    const removeItem = async (item: any) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/carrito/${item.id}`,
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        )
        await cartStore.fetchBackendCart()
      } catch (error) {
        console.error(error)
      }
    }

    const updateQuantity = async (item: any) => {
      const newQuantity = updatedQuantities[item.id]
      if (newQuantity < 1) {
        alert('La cantidad debe ser al menos 1')
        updatedQuantities[item.id] = item.cantidad
        return
      }
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/carrito/${item.id}`,
          { cantidad: newQuantity },
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        )
        await cartStore.fetchBackendCart()
      } catch (error: any) {
        alert(error.response?.data?.message || 'Error actualizando cantidad')
        // revertir al valor anterior
        updatedQuantities[item.id] = item.cantidad
      }
    }

    const checkout = () => {
      router.push('/checkout')
    }

    const subtotal = computed(() =>
      cartStore.backendCart.reduce(
        (acc, item) => acc + item.producto.precio * item.cantidad,
        0
      )
    )

    return {
      cartStore,
      removeItem,
      checkout,
      subtotal,
      fallbackImg,
      updatedQuantities,
      updateQuantity
    }
  }
})
</script>
