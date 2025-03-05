<template>
  <div class="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow-xl rounded animate-fade-in-down">
    <h2 class="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
      Iniciar Sesión
    </h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="nombreUsuario" class="block text-gray-700 dark:text-gray-200 mb-1">
          Usuario
        </label>
        <input
          id="nombreUsuario"
          v-model="nombreUsuario"
          type="text"
          placeholder="Ingresa tu usuario"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="nombreUsuarioError" class="text-red-500 text-sm mt-1">
          {{ nombreUsuarioError }}
        </p>
      </div>
      <div>
        <label for="contrasena" class="block text-gray-700 dark:text-gray-200 mb-1">
          Contraseña
        </label>
        <input
          id="contrasena"
          v-model="contrasena"
          type="password"
          placeholder="Ingresa tu contraseña"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="contrasenaError" class="text-red-500 text-sm mt-1">
          {{ contrasenaError }}
        </p>
      </div>
      <button type="submit" :disabled="!isFormValid" class="w-full btn-primary hover:scale-105 transform">
        Iniciar Sesión
      </button>
    </form>
    <div class="mt-4 text-center">
      <button class="w-full btn-secondary hover:scale-105 transform mb-2" @click="loginWithGoogle">
        <i class="fa-brands fa-google mr-2"></i>
        Iniciar con Google
      </button>
      <p class="text-gray-700 dark:text-gray-300">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-curious-blue-600 dark:text-curious-blue-400 hover:underline">
          Crear una cuenta
        </router-link>
      </p>
    </div>
    <PopupNotification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      :icon="notificationIcon"
      @close="notificationMessage = ''"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import PopupNotification from '../components/PopupNotification.vue'

export default defineComponent({
  name: 'LoginView',
  components: { PopupNotification },
  setup() {
    const nombreUsuario = ref('')
    const contrasena = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const nombreUsuarioError = computed(() =>
      nombreUsuario.value.trim() === '' ? 'El usuario es requerido.' : ''
    )
    const contrasenaError = computed(() =>
      contrasena.value.trim() === '' ? 'La contraseña es requerida.' : ''
    )
    const isFormValid = computed(() => nombreUsuario.value.trim() !== '' && contrasena.value.trim() !== '')

    const notificationMessage = ref('')
    const notificationType = ref('')
    const notificationIcon = ref('')

    const handleLogin = async () => {
      if (!isFormValid.value) return
      try {
        await authStore.login(nombreUsuario.value, contrasena.value)
        router.push('/')
      } catch (error: any) {
        notificationMessage.value = error.response?.data?.message || 'Error al iniciar sesión'
        notificationType.value = 'error'
        notificationIcon.value = 'fa-solid fa-xmark'
      }
    }

    const loginWithGoogle = () => {
      window.location.href = import.meta.env.VITE_BACKEND_URL + '/auth/google'
    }

    return {
      nombreUsuario,
      contrasena,
      nombreUsuarioError,
      contrasenaError,
      isFormValid,
      handleLogin,
      notificationMessage,
      notificationType,
      notificationIcon,
      loginWithGoogle
    }
  }
})
</script>
