<template>
  <div class="p-6">
    <h2 class="text-4xl font-bold mb-6 text-center">Productos Disponibles</h2>

    <!-- Spinner de carga -->
    <LoadingSpinner v-if="loading" />

    <!-- Grid de productos -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in-down"
    >
      <div
        v-for="product in productsStore.products"
        :key="product.id"
        class="product-card border rounded p-4 bg-white dark:bg-gray-700 shadow hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <!-- Imagen del producto (usando getImageUrl) -->
        <LazyImage
          :src="getImageUrl(product.imagen)"
          :alt="product.nombre"
          class="mb-4 rounded"
        />

        <!-- Nombre del producto -->
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
          class="text-xl font-semibold mb-2 block hover:underline"
        >
          {{ product.nombre }}
        </router-link>

        <!-- Descripción -->
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          {{ product.descripcion || 'Sin descripción' }}
        </p>

        <!-- Precio -->
        <p class="font-bold mb-4">S/ {{ product.precio }}</p>

        <!-- Selector de cantidad -->
        <div class="flex items-center space-x-2 mb-3">
          <label class="text-sm text-gray-600 dark:text-gray-300">Cantidad:</label>
          <input
            type="number"
            min="1"
            class="w-16 border rounded px-2 dark:bg-gray-700 dark:text-gray-200"
            v-model.number="quantities[product.id]"
          />
        </div>

        <!-- Botón para agregar al carrito -->
        <button
          class="btn-primary hover:scale-105 transform w-full"
          @click="addToCart(product)"
        >
          <i class="fa-solid fa-cart-plus mr-2"></i>
          Agregar
        </button>
      </div>
    </div>

    <!-- Modal de producto agregado -->
    <AddToCartModal
      :visible="showAddToCartModal"
      @update:visible="val => showAddToCartModal = val"
    />
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
import AddToCartModal from '../components/AddToCartModal.vue'

export default defineComponent({
  name: 'ProductsView',
  components: { LazyImage, LoadingSpinner, AddToCartModal },
  setup() {
    const productsStore = useProductsStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const loading = ref(true)
    const quantities = ref<Record<number, number>>({})
    const showAddToCartModal = ref(false)

    onMounted(async () => {
      loading.value = true
      await productsStore.fetchProducts()
      productsStore.products.forEach((p) => {
        quantities.value[p.id] = 1
      })
      loading.value = false
    })

    // Construye la URL de la imagen (o usa fallback) según tu backend
    const getImageUrl = (img: string | undefined) => {
      if (!img) {
        return 'https://via.placeholder.com/300?text=Sin+Imagen'
      }
      // Ajusta la concatenación si tu backend sirve imágenes en otra ruta
      // Por ejemplo: VITE_BACKEND_URL + '/storage/' + img
      return import.meta.env.VITE_BACKEND_URL + '/storage/' + img
    }

    const addToCart = async (product: any) => {
      if (!authStore.isLoggedIn) {
        router.push('/login')
        return
      }
      const qty = quantities.value[product.id] && quantities.value[product.id] > 0
        ? quantities.value[product.id]
        : 1
      try {
        await cartStore.addItemBackend(product.id, qty)
        showAddToCartModal.value = true
      } catch (error: any) {
        alert(error.message || 'Error al agregar al carrito')
      }
    }

    return {
      productsStore,
      cartStore,
      authStore,
      router,
      loading,
      quantities,
      showAddToCartModal,
      addToCart,
      getImageUrl
    }
  }
})
</script>
