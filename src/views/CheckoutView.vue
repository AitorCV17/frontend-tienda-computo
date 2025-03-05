<template>
  <div class="max-w-5xl mx-auto p-4">
    <h2 class="text-3xl font-bold mb-6">Checkout</h2>

    <!-- Sección Dirección de Envío -->
    <div class="mb-6 border p-4 rounded">
      <h3 class="text-xl font-semibold mb-2">Dirección de Envío</h3>
      <input
        v-model="shippingAddress"
        type="text"
        placeholder="Ingresa tu dirección"
        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
      />
    </div>

    <!-- Sección Método de Envío -->
    <div class="mb-6 border p-4 rounded">
      <h3 class="text-xl font-semibold mb-2">Método de Envío</h3>
      <div v-for="method in shippingMethods" :key="method.id" class="flex items-center mb-2">
        <input
          type="radio"
          :value="method.id"
          v-model="selectedShippingMethod"
          class="mr-2"
        />
        <label>
          {{ method.nombre }} (S/. {{ method.costo }})
        </label>
      </div>
    </div>

    <!-- Sección Método de Pago -->
    <div class="mb-6 border p-4 rounded">
      <h3 class="text-xl font-semibold mb-2">Método de Pago</h3>
      <div v-for="method in paymentMethods" :key="method.id" class="flex items-center mb-2">
        <input
          type="radio"
          :value="method.id"
          v-model="selectedPaymentMethod"
          class="mr-2"
        />
        <label>
          {{ method.nombre }}
        </label>
      </div>
    </div>

    <!-- Resumen de Carrito -->
    <div class="mb-6 border p-4 rounded">
      <h3 class="text-xl font-semibold mb-2">Resumen de Compra</h3>
      <div v-for="item in cartStore.backendCart" :key="item.id" class="flex items-center justify-between mb-2">
        <div>
          <p class="font-semibold">{{ item.producto.nombre }}</p>
          <p class="text-sm text-gray-500">Cantidad: {{ item.cantidad }}</p>
        </div>
        <p>S/. {{ (item.producto.precio * item.cantidad).toFixed(2) }}</p>
      </div>
      <hr class="my-2" />
      <div class="flex items-center justify-between">
        <span>Subtotal:</span>
        <span>S/. {{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex items-center justify-between" v-if="selectedShipping">
        <span>Envío:</span>
        <span>S/. {{ selectedShipping.costo.toFixed(2) }}</span>
      </div>
      <div class="flex items-center justify-between mt-2 text-lg font-bold">
        <span>Total:</span>
        <span>S/. {{ total.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Botón Finalizar -->
    <button
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      @click="finalizePurchase"
    >
      Finalizar Compra
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface ShippingMethod {
  id: number
  nombre: string
  costo: number
}
interface PaymentMethod {
  id: number
  nombre: string
}

export default defineComponent({
  name: 'CheckoutView',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const shippingAddress = ref('')
    const shippingMethods = ref<ShippingMethod[]>([])
    const paymentMethods = ref<PaymentMethod[]>([])
    const selectedShippingMethod = ref<number | null>(null)
    const selectedPaymentMethod = ref<number | null>(null)

    onMounted(() => {
      // Verifica que haya productos en el carrito
      if (cartStore.backendCart.length === 0) {
        router.push('/products')
      }
      // Verifica login
      if (!authStore.isLoggedIn) {
        router.push('/login')
      }
      // Simulamos traer métodos de envío/pago
      shippingMethods.value = [
        { id: 1, nombre: 'Envío Regular (2-5 días)', costo: 10 },
        { id: 2, nombre: 'Envío Express (1-2 días)', costo: 20 }
      ]
      paymentMethods.value = [
        { id: 1, nombre: 'Tarjeta de Crédito' },
        { id: 2, nombre: 'Pago Contra Entrega' },
        { id: 3, nombre: 'MercadoPago' }
      ]
    })

    const subtotal = computed(() =>
      cartStore.backendCart.reduce(
        (acc, item) => acc + item.producto.precio * item.cantidad,
        0
      )
    )
    const selectedShipping = computed(() =>
      shippingMethods.value.find((m) => m.id === selectedShippingMethod.value)
    )
    const total = computed(() => {
      const shippingCost = selectedShipping.value ? selectedShipping.value.costo : 0
      return subtotal.value + shippingCost
    })

    const finalizePurchase = async () => {
      if (!shippingAddress.value) {
        alert('Por favor, ingresa tu dirección de envío.')
        return
      }
      if (!selectedShippingMethod.value) {
        alert('Por favor, selecciona un método de envío.')
        return
      }
      if (!selectedPaymentMethod.value) {
        alert('Por favor, selecciona un método de pago.')
        return
      }
      try {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + '/ordenes/checkout',
          {
            direccion: shippingAddress.value,
            envioId: selectedShippingMethod.value,
            pagoId: selectedPaymentMethod.value,
            items: cartStore.backendCart
          },
          {
            headers: { Authorization: `Bearer ${authStore.token}` }
          }
        )
        alert('Compra finalizada con éxito. Orden # ' + response.data.ordenId)
        // Limpia el carrito, o haz fetch del carrito
        await cartStore.fetchBackendCart()
        router.push('/')
      } catch (error: any) {
        alert(error.response?.data?.message || 'Error en checkout')
      }
    }

    return {
      cartStore,
      authStore,
      router,
      shippingAddress,
      shippingMethods,
      paymentMethods,
      selectedShippingMethod,
      selectedPaymentMethod,
      subtotal,
      selectedShipping,
      total,
      finalizePurchase
    }
  }
})
</script>
