import { defineStore } from 'pinia'
import axios from 'axios'

export interface Producto {
  id: number
  nombre: string
  descripcion?: string
  precio: number
  imagen?: string
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Producto[]
  }),
  actions: {
    async fetchProducts() {
      try {
        const { data } = await axios.get<Producto[]>(import.meta.env.VITE_BACKEND_URL + '/productos')
        this.products = data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async fetchProductById(id: number): Promise<Producto | undefined> {
      try {
        const { data } = await axios.get<Producto>(import.meta.env.VITE_BACKEND_URL + `/productos/${id}`)
        return data
      } catch (error) {
        console.error('Error fetching product by id:', error)
      }
    }
  }
})
