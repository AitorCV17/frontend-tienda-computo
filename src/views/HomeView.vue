<template>
  <div>
    <!-- Hero principal -->
    <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2">
          <h1 class="text-5xl font-bold mb-4">¡Bienvenido a la Tienda de Computación!</h1>
          <p class="text-lg mb-6">
            Descubre las mejores ofertas en PCs, Laptops, Periféricos y más.  
            La tecnología de vanguardia al alcance de tu mano.
          </p>
          <div class="space-x-4">
            <router-link to="/products" class="btn-primary inline-block">
              Ver Productos
            </router-link>
            <router-link to="/login" class="btn-secondary inline-block">
              Iniciar Sesión
            </router-link>
          </div>
        </div>
        <div class="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img
            src="https://via.placeholder.com/450x300?text=PC+GAMING"
            alt="PC"
            class="rounded shadow-2xl"
          />
        </div>
      </div>
    </section>

    <!-- Sección Productos Más Vendidos -->
    <section class="py-12 bg-gray-100 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">Productos Más Vendidos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in bestSellers"
            :key="product.id"
            class="border rounded p-4 bg-white dark:bg-gray-700 shadow hover:shadow-lg transition"
          >
            <img
              :src="product.imagen || fallbackImg"
              alt="Más Vendido"
              class="w-full h-48 object-cover mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ product.nombre }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ product.descripcion }}</p>
            <p class="font-bold mb-4">S/ {{ product.precio }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn-primary w-full block text-center">
              Ver Detalle
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Productos Recientes -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">Productos Recientes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in recentProducts"
            :key="product.id"
            class="border rounded p-4 bg-white dark:bg-gray-700 shadow hover:shadow-lg transition"
          >
            <img
              :src="product.imagen || fallbackImg"
              alt="Reciente"
              class="w-full h-48 object-cover mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ product.nombre }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ product.descripcion }}</p>
            <p class="font-bold mb-4">S/ {{ product.precio }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn-primary w-full block text-center">
              Ver Detalle
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const bestSellers = ref<any[]>([])
    const recentProducts = ref<any[]>([])
    const fallbackImg = 'https://via.placeholder.com/300'

    onMounted(async () => {
      // Ajusta a tus endpoints reales
      try {
        const res1 = await axios.get(import.meta.env.VITE_BACKEND_URL + '/products/best-sellers')
        bestSellers.value = res1.data
      } catch {
        bestSellers.value = []
      }
      try {
        const res2 = await axios.get(import.meta.env.VITE_BACKEND_URL + '/products/recent')
        recentProducts.value = res2.data
      } catch {
        recentProducts.value = []
      }
    })

    return {
      bestSellers,
      recentProducts,
      fallbackImg
    }
  }
})
</script>

<style scoped>
/* Ajustes extra para hero */
section.relative.bg-gradient-to-r {
  background: linear-gradient(to right, #004aad, #0066d6);
}
</style>
