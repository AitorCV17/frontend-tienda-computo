<template>
  <div class="animate-fade-in-down">
    <div class="relative bg-cover bg-center" :style="heroStyle">
      <div class="bg-gradient-to-r from-curious-blue-900 via-curious-blue-600 to-curious-blue-500 bg-opacity-80 py-20">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h2 class="hero-title mb-4">Bienvenido a la Tienda de Computación</h2>
          <p class="hero-subtitle mb-8">Encuentra las mejores ofertas en PCs, Laptops, Periféricos y más</p>
          <div class="space-x-4">
            <router-link to="/products" class="btn-primary hover:scale-105 transform">
              Ver Productos
            </router-link>
            <router-link to="/login" class="btn-secondary hover:scale-105 transform">
              Iniciar Sesión
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Productos más vendidos -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <h3 class="text-3xl font-bold mb-6">Productos Más Vendidos</h3>
      <div v-if="loadingMostSold" class="text-center">
        <LoadingSpinner />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="product in mostSoldProducts" :key="product.id" class="product-card">
          <LazyImage :src="product.imagen || fallbackImg" :alt="product.nombre" class="mb-4 rounded" />
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-xl font-semibold mb-2 block hover:underline">
            {{ product.nombre }}
          </router-link>
          <p class="text-gray-600 dark:text-gray-300 mb-2">
            {{ product.descripcion || 'Sin descripción' }}
          </p>
          <p class="font-bold mb-4">S/ {{ product.precio }}</p>
          <button class="btn-primary w-full" @click="addToCart(product)">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </section>

    <!-- Productos recientes -->
    <section class="max-w-7xl mx-auto py-12 px-4 bg-gray-100 dark:bg-gray-800">
      <h3 class="text-3xl font-bold mb-6">Productos Recientes</h3>
      <div v-if="loadingRecent" class="text-center">
        <LoadingSpinner />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="product in recentProducts" :key="product.id" class="product-card">
          <LazyImage :src="product.imagen || fallbackImg" :alt="product.nombre" class="mb-4 rounded" />
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-xl font-semibold mb-2 block hover:underline">
            {{ product.nombre }}
          </router-link>
          <p class="text-gray-600 dark:text-gray-300 mb-2">
            {{ product.descripcion || 'Sin descripción' }}
          </p>
          <p class="font-bold mb-4">S/ {{ product.precio }}</p>
          <button class="btn-primary w-full" @click="addToCart(product)">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LazyImage from '../components/LazyImage.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useCartStore } from '../store/cart'
import axios from 'axios'

interface ProductoHome {
  id: number
  nombre: string
  descripcion?: string
  precio: number
  imagen?: string
}

export default defineComponent({
  name: 'HomeView',
  components: { LazyImage, LoadingSpinner },
  setup() {
    const fallbackImg = 'https://via.placeholder.com/300'
    const heroStyle = ref({
      backgroundImage: "url('../assets/hero.jpg')"
    })

    const mostSoldProducts = ref<ProductoHome[]>([])
    const recentProducts = ref<ProductoHome[]>([])
    const loadingMostSold = ref(true)
    const loadingRecent = ref(true)
    const cartStore = useCartStore()

    const fetchMostSold = async () => {
      try {
        const { data } = await axios.get<ProductoHome[]>(
          import.meta.env.VITE_BACKEND_URL + '/productos/destacados/mas-vendidos'
        )
        mostSoldProducts.value = data
      } catch (error) {
        console.error(error)
      } finally {
        loadingMostSold.value = false
      }
    }

    const fetchRecent = async () => {
      try {
        const { data } = await axios.get<ProductoHome[]>(
          import.meta.env.VITE_BACKEND_URL + '/productos/destacados/recientes'
        )
        recentProducts.value = data
      } catch (error) {
        console.error(error)
      } finally {
        loadingRecent.value = false
      }
    }

    const addToCart = (product: ProductoHome) => {
      cartStore.addItemBackend(product.id, 1)
    }

    fetchMostSold()
    fetchRecent()

    return {
      fallbackImg,
      heroStyle,
      mostSoldProducts,
      recentProducts,
      loadingMostSold,
      loadingRecent,
      addToCart
    }
  }
})
</script>
