<!-- src/views/HomeView.vue -->
<template>
  <div class="animate-fade-in-down">
    <div class="relative bg-cover bg-center" :style="heroStyle">
      <div class="bg-gradient-to-r from-curious-blue-900 via-curious-blue-600 to-curious-blue-500 bg-opacity-80 py-20">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h2 class="hero-title mb-4">Bienvenido a la Tienda de Computación</h2>
          <p class="hero-subtitle mb-8">Encuentra las mejores ofertas en PCs, Laptops, Periféricos y más</p>
          <div class="space-x-4">
            <router-link to="/products" class="btn-primary hover:scale-105 transform">
              <i class="fa-solid fa-cart-shopping mr-2"></i>
              Ver Productos
            </router-link>
            <router-link to="/login" class="btn-secondary hover:scale-105 transform">
              <i class="fa-solid fa-user mr-2"></i>
              Iniciar Sesión
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto py-12 px-4">
      <h3 class="text-3xl font-bold mb-6">Ofertas Destacadas</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div class="product-card">
          <img src="https://via.placeholder.com/300" alt="Oferta" class="w-full h-48 object-cover rounded mb-4" />
          <h4 class="text-xl font-semibold mb-2">Teclado Mecánico RGB</h4>
          <p class="text-gray-600 dark:text-gray-300 mb-2">Switches Blue / Iluminación RGB</p>
          <p class="font-bold mb-4">S/ 129.90</p>
          <button class="btn-primary w-full">
            <i class="fa-solid fa-cart-plus mr-2"></i>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 dark:bg-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h3 class="text-3xl font-bold mb-6">Nuevos Productos</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div class="product-card">
            <img src="https://via.placeholder.com/300" alt="Nuevo Producto" class="w-full h-48 object-cover rounded mb-4" />
            <h4 class="text-xl font-semibold mb-2">Tarjeta de Video RTX 4060</h4>
            <p class="text-gray-600 dark:text-gray-300 mb-2">8GB GDDR6 / Ray Tracing</p>
            <p class="font-bold mb-4">S/ 1,500.00</p>
            <button class="btn-primary w-full">
              <i class="fa-solid fa-cart-plus mr-2"></i>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const heroStyle = computed(() => ({
      backgroundImage: "url('@/assets/hero.jpg')"
    }))
    return { heroStyle }
  }
})
</script>
