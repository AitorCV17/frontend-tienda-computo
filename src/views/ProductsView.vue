<template>
  <div class="p-6">
    <h2 class="text-4xl font-bold mb-6 text-center">Productos Disponibles</h2>
    <LoadingSpinner v-if="loading" />
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="product in productsStore.products" :key="product.id" class="product-card">
        <LazyImage :src="product.imagen || fallbackImg" :alt="product.nombre" class="mb-4 rounded" />
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-xl font-semibold mb-2 block hover:underline">
          {{ product.nombre }}
        </router-link>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          {{ product.descripcion || 'Sin descripción' }}
        </p>
        <p class="font-bold mb-4">S/ {{ product.precio }}</p>
        <div class="flex items-center space-x-2 mb-3">
          <label class="text-sm text-gray-600 dark:text-gray-300">Cantidad:</label>
          <input type="number" min="1" class="w-16 border rounded px-2 dark:bg-gray-700 dark:text-gray-200" v-model.number="quantities[product.id]" />
        </div>
        <button class="btn-primary hover:scale-105 transform w-full" @click="addToCart(product)">
          <i class="fa-solid fa-cart-plus mr-2"></i>
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import LazyImage from '../components/LazyImage.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default defineComponent({
  name: 'ProductsView',
  components: { LazyImage, LoadingSpinner },
  setup() {
    const productsStore = useProductsStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()
    const loading = ref(true)
    const fallbackImg = 'https://via.placeholder.com/300'
    const quantities = ref<Record<number, number>>({})

    onMounted(async () => {
      loading.value = true
      await productsStore.fetchProducts()
      productsStore.products.forEach((p: any) => {
        quantities.value[p.id] = 1
      })
      loading.value = false
    })

    const addToCart = (product: any) => {
      if (!authStore.isLoggedIn) {
        router.push('/login')
        return
      }
      const qty = quantities.value[product.id] || 1
      cartStore.addItemBackend(product.id, qty).catch(err => {
        alert(err.message || 'Error agregando al carrito')
      })
    }

    return {
      loading,
      fallbackImg,
      quantities,
      productsStore,
      addToCart
    }
  }
})
</script>
