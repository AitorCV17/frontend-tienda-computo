import { defineStore } from 'pinia'
import axios from 'axios'

interface LoginResponse {
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null as string | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async login(nombreUsuario: string, contrasena: string): Promise<void> {
      const response = await axios.post<LoginResponse>(
        import.meta.env.VITE_BACKEND_URL + '/auth/login',
        { nombreUsuario, contrasena }
      )
      this.token = response.data.token
      localStorage.setItem('token', this.token)
    },
    async register(nombreUsuario: string, correo: string, contrasena: string): Promise<void> {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/auth/register',
        { nombreUsuario, correo, contrasena }
      )
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
