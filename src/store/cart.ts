// src/store/cart.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    backendCart: [] as any[]
  }),
  actions: {
    async addItemBackend(productId: number, quantity: number) {
      const authStore = useAuthStore()
      if (!authStore.token) throw new Error('No token, user not logged in')
      await axios.post('http://localhost:8000/api/cart', {
        productId,
        quantity
      }, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
    },
    async fetchBackendCart() {
      const authStore = useAuthStore()
      if (!authStore.token) return
      const { data } = await axios.get('http://localhost:8000/api/cart', {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
      this.backendCart = data
    }
  }
})
