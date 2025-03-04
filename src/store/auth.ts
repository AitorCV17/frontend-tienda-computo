// src/store/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    loadTokenFromStorage() {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        this.token = storedToken
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
