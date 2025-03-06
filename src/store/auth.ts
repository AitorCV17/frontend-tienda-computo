// src/store/auth.ts
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core' // Para asegurar compatibilidad con VueUse

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useStorage('auth', null) as unknown as string | null
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
  persist: true
})
