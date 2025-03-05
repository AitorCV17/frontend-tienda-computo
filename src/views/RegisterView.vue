<template>
  <div class="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow-xl rounded animate-fade-in-down">
    <h2 class="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
      Crear Cuenta
    </h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
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
        <label for="correo" class="block text-gray-700 dark:text-gray-200 mb-1">
          Correo Electrónico
        </label>
        <input
          id="correo"
          v-model="correo"
          type="email"
          placeholder="Ingresa tu email"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="correoError" class="text-red-500 text-sm mt-1">
          {{ correoError }}
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
      <div>
        <label for="confirmContrasena" class="block text-gray-700 dark:text-gray-200 mb-1">
          Confirmar Contraseña
        </label>
        <input
          id="confirmContrasena"
          v-model="confirmContrasena"
          type="password"
          placeholder="Confirma tu contraseña"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="confirmContrasenaError" class="text-red-500 text-sm mt-1">
          {{ confirmContrasenaError }}
        </p>
      </div>
      <button type="submit" :disabled="!isFormValid" class="w-full btn-primary hover:scale-105 transform">
        Crear Cuenta
      </button>
    </form>
    <p class="mt-4 text-center text-gray-700 dark:text-gray-300">
      ¿Ya tienes cuenta?
      <router-link to="/login" class="text-curious-blue-600 dark:text-curious-blue-400 hover:underline">
        Inicia Sesión
      </router-link>
    </p>
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
import axios from 'axios'
import { useRouter } from 'vue-router'
import PopupNotification from '../components/PopupNotification.vue'

export default defineComponent({
  name: 'RegisterView',
  components: { PopupNotification },
  setup() {
    const nombreUsuario = ref('')
    const correo = ref('')
    const contrasena = ref('')
    const confirmContrasena = ref('')
    const router = useRouter()

    const nombreUsuarioError = computed(() =>
      nombreUsuario.value.trim() === '' ? 'El usuario es requerido.' : ''
    )
    const correoError = computed(() =>
      correo.value.trim() === '' ? 'El correo es requerido.' : ''
    )
    const contrasenaError = computed(() =>
      contrasena.value.trim() === '' ? 'La contraseña es requerida.' : ''
    )
    const confirmContrasenaError = computed(() =>
      confirmContrasena.value.trim() === ''
        ? 'Debes confirmar la contraseña.'
        : confirmContrasena.value !== contrasena.value
        ? 'Las contraseñas no coinciden.'
        : ''
    )
    const isFormValid = computed(() =>
      nombreUsuario.value.trim() !== '' &&
      correo.value.trim() !== '' &&
      contrasena.value.trim() !== '' &&
      confirmContrasena.value.trim() !== '' &&
      confirmContrasena.value === contrasena.value
    )

    const notificationMessage = ref('')
    const notificationType = ref('')
    const notificationIcon = ref('')

    const handleRegister = async () => {
      if (!isFormValid.value) return
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND_URL + '/auth/register',
          { nombreUsuario: nombreUsuario.value, correo: correo.value, contrasena: contrasena.value }
        )
        alert('Registro exitoso. Por favor, inicia sesión.')
        router.push('/login')
      } catch (error: any) {
        notificationMessage.value = error.response?.data?.message || 'Error al registrarse'
        notificationType.value = 'error'
        notificationIcon.value = 'fa-solid fa-xmark'
      }
    }

    return {
      nombreUsuario,
      correo,
      contrasena,
      confirmContrasena,
      nombreUsuarioError,
      correoError,
      contrasenaError,
      confirmContrasenaError,
      isFormValid,
      handleRegister,
      notificationMessage,
      notificationType,
      notificationIcon
    }
  }
})
</script>
