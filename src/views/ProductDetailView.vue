<template>
  <div class="max-w-5xl mx-auto p-6" v-if="product">
    <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      <LazyImage :src="product.image || fallbackImg" :alt="product.name" class="w-full md:w-1/2 h-80 object-cover rounded" />
      <div class="md:w-1/2">
        <h2 class="text-3xl font-bold mb-4">{{ product.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ product.description || 'Sin descripción' }}</p>
        <p class="text-2xl font-bold mb-4">S/ {{ product.price }}</p>
        <div class="flex items-center space-x-2 mb-4">
          <label for="qtyDetail" class="text-sm text-gray-600 dark:text-gray-300">Cantidad:</label>
          <input
            id="qtyDetail"
            type="number"
            min="1"
            class="w-16 border rounded px-2 dark:bg-gray-700 dark:text-gray-200"
            v-model.number="quantity"
          />
        </div>
        <button class="btn-primary hover:scale-105 transform" @click="addToCart">
          <i class="fa-solid fa-cart-plus mr-2"></i>
          Agregar al Carrito
        </button>
      </div>
    </div>
  </div>
  <LoadingSpinner v-else />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/store/products'
import { useCartStore } from '@/store/cart'
import LazyImage from '@/components/LazyImage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default defineComponent({
  name: 'ProductDetailView',
  components: { LazyImage, LoadingSpinner },
  setup() {
    const route = useRoute()
    const productsStore = useProductsStore()
    const cartStore = useCartStore()

    const product = ref<any>(null)
    const quantity = ref(1)
    const fallbackImg = 'https://via.placeholder.com/300'
    const loading = ref(true)

    onMounted(async () => {
      const id = route.params.id as string
      if (!productsStore.products.length) {
        await productsStore.fetchProducts()
      }
      product.value = productsStore.products.find(p => p.id == +id) 
        || await productsStore.fetchProductById(+id)
      loading.value = false
    })

    const addToCart = () => {
      cartStore.addItemBackend(product.value.id, quantity.value)
    }

    return {
      product,
      quantity,
      fallbackImg,
      loading,
      addToCart
    }
  }
})
</script>
