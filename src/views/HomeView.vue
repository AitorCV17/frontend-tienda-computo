<template>
  <div>
    <!-- Hero principal con wave shape decorativa -->
    <section
      class="relative overflow-hidden bg-gradient-to-r from-science-blue-600 to-science-blue-800 text-white py-16 animate-fade-in-down"
    >
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 space-y-6">
          <h1 class="text-5xl font-bold mb-4 animate-pop">¡Bienvenido a la Tienda de Computación!</h1>
          <p class="text-lg leading-relaxed">
            Descubre las mejores ofertas en PCs, Laptops, Periféricos y más.
            La tecnología de vanguardia al alcance de tu mano. 
            <br />
            <span class="font-semibold">
              ¡Calidad, Garantía y Soporte Técnico especializado!
            </span>
          </p>
          <div class="space-x-4 mt-4">
            <router-link to="/products" class="btn-primary inline-block hover:scale-105 transform">
              Ver Productos
            </router-link>
          </div>
        </div>
        <div class="md:w-1/2 mt-6 md:mt-0 flex justify-center animate-pop">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/412/788/small_2x/modern-gaming-pc-isolated-on-transparent-free-png.png"
            alt="PC"
            class="rounded shadow-2xl"
          />
        </div>
      </div>
      <!-- Forma ondulada decorativa al final del hero -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none text-white">
        <svg
          class="block relative w-full h-16"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#1b3a5f"
            fill-opacity="1"
            d="M0,64L48,64C96,64,192,64,288,96C384,128,480,192,576,213.3C672,235,768,213,864,202.7C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Sección de valores agregados -->
    <section class="bg-gray-100 dark:bg-gray-800 py-12 animate-fade-in-down">
      <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
        <div class="bg-white dark:bg-gray-700 rounded shadow p-6 hover:shadow-lg transition">
          <i class="fa-solid fa-truck-fast text-3xl mb-4 text-science-blue-500"></i>
          <h3 class="text-xl font-semibold mb-2">Envío Rápido</h3>
          <p class="text-gray-600 dark:text-gray-300">Recibe tus productos en tiempo récord.</p>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded shadow p-6 hover:shadow-lg transition">
          <i class="fa-solid fa-shield-halved text-3xl mb-4 text-science-blue-500"></i>
          <h3 class="text-xl font-semibold mb-2">Compra Segura</h3>
          <p class="text-gray-600 dark:text-gray-300">Protegemos tus datos y transacciones.</p>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded shadow p-6 hover:shadow-lg transition">
          <i class="fa-solid fa-headset text-3xl mb-4 text-science-blue-500"></i>
          <h3 class="text-xl font-semibold mb-2">Soporte 24/7</h3>
          <p class="text-gray-600 dark:text-gray-300">Siempre disponibles para ayudarte.</p>
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
            class="border rounded p-4 bg-white dark:bg-gray-700 shadow hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              :src="product.imagen || fallbackImg"
              alt="Más Vendido"
              class="w-full h-48 object-cover mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ product.nombre }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ product.descripcion }}</p>
            <p class="font-bold mb-4">S/ {{ product.precio }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }"
              class="btn-primary w-full block text-center hover:scale-105 transform"
            >
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
            class="border rounded p-4 bg-white dark:bg-gray-700 shadow hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              :src="product.imagen || fallbackImg"
              alt="Reciente"
              class="w-full h-48 object-cover mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ product.nombre }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ product.descripcion }}</p>
            <p class="font-bold mb-4">S/ {{ product.precio }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }"
              class="btn-primary w-full block text-center hover:scale-105 transform"
            >
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
    const fallbackImg = 'https://via.placeholder.com/300?text=No+Image'

    onMounted(async () => {
      try {
        const res1 = await axios.get(import.meta.env.VITE_BACKEND_URL + '/productos/destacados/mas-vendidos')
        bestSellers.value = res1.data
      } catch {
        bestSellers.value = []
      }
      try {
        const res2 = await axios.get(import.meta.env.VITE_BACKEND_URL + '/productos/destacados/recientes')
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
section.bg-gradient-to-r.from-science-blue-600.to-science-blue-800 {
  background: linear-gradient(to right, #2f7dc8, #1b4f89) !important;
}
</style>
