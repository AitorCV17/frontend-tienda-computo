import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export interface CarritoItem {
  id: number
  producto: {
    nombre: string
    precio: number
    imagen?: string
  }
  cantidad: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    backendCart: [] as CarritoItem[]
  }),
  actions: {
    async addItemBackend(productId: number, cantidad: number): Promise<void> {
      const authStore = useAuthStore()
      if (!authStore.token) throw new Error('No token, usuario no autenticado')

      // Asegúrate de enviar "productoId" en lugar de "productId":
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/carrito',
        { productoId: productId, cantidad },
        { headers: { Authorization: `Bearer ${authStore.token}` } }
      )

      // Luego recargas el carrito
      await this.fetchBackendCart()
    },

    async fetchBackendCart(): Promise<void> {
      const authStore = useAuthStore()
      if (!authStore.token) return
      const { data } = await axios.get<CarritoItem[]>(
        import.meta.env.VITE_BACKEND_URL + '/carrito',
        { headers: { Authorization: `Bearer ${authStore.token}` } }
      )
      this.backendCart = data
    }
  }
})
