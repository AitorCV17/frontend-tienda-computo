import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as any[]
  }),
  actions: {
    async fetchProducts() {
      try {
        // Ajusta la URL a tu backend real
        const { data } = await axios.get('http://localhost:8000/api/products')
        this.products = data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  }
})
