// src/store/auth.ts
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core' // Para asegurar compatibilidad con VueUse

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useStorage('auth', null) as unknown as string | null // Usa useStorage para sincronización reactiva con localStorage
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.token = null
    }
  },
  persist: true // Esto activa la persistencia correctamente con pinia-plugin-persistedstate
})
