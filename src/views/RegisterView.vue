<!-- src/views/RegisterView.vue -->
<template>
  <div class="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow-xl rounded animate-fade-in-down">
    <h2 class="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
      Crear Cuenta
    </h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="username" class="block text-gray-700 dark:text-gray-200 mb-1">
          Usuario
        </label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Ingresa tu usuario"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="usernameError" class="text-red-500 text-sm mt-1">
          {{ usernameError }}
        </p>
      </div>
      <div>
        <label for="email" class="block text-gray-700 dark:text-gray-200 mb-1">
          Correo Electrónico
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Ingresa tu email"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">
          {{ emailError }}
        </p>
      </div>
      <div>
        <label for="password" class="block text-gray-700 dark:text-gray-200 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="passwordError" class="text-red-500 text-sm mt-1">
          {{ passwordError }}
        </p>
      </div>
      <div>
        <label for="confirmPassword" class="block text-gray-700 dark:text-gray-200 mb-1">
          Confirmar Contraseña
        </label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirma tu contraseña"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-curious-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">
          {{ confirmPasswordError }}
        </p>
      </div>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="w-full btn-primary hover:scale-105 transform"
      >
        Crear Cuenta
      </button>
    </form>
    <p class="mt-4 text-center text-gray-700 dark:text-gray-300">
      ¿Ya tienes cuenta?
      <router-link
        to="/login"
        class="text-curious-blue-600 dark:text-curious-blue-400 hover:underline"
      >
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
import PopupNotification from '@/components/PopupNotification.vue'

export default defineComponent({
  name: 'RegisterView',
  components: { PopupNotification },
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const router = useRouter()

    const usernameError = computed(() =>
      username.value.trim() === '' ? 'El usuario es requerido.' : ''
    )
    const emailError = computed(() => {
      if (email.value.trim() === '') return 'El correo es requerido.'
      const regex = /\S+@\S+\.\S+/
      return regex.test(email.value) ? '' : 'Correo inválido.'
    })
    const passwordError = computed(() => {
      if (password.value.trim() === '') return 'La contraseña es requerida.'
      if (password.value.length < 6) return 'Debe tener al menos 6 caracteres.'
      return ''
    })
    const confirmPasswordError = computed(() => {
      if (confirmPassword.value.trim() === '') return 'Confirma tu contraseña.'
      return confirmPassword.value !== password.value ? 'Las contraseñas no coinciden.' : ''
    })
    const isFormValid = computed(() =>
      username.value &&
      email.value &&
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value
    )

    const notificationMessage = ref('')
    const notificationType = ref('')
    const notificationIcon = ref('')

    const handleRegister = async () => {
      if (!isFormValid.value) return
      try {
        await axios.post('http://localhost:8000/api/auth/register', {
          username: username.value,
          email: email.value,
          password: password.value
        })
        notificationMessage.value = 'Registro exitoso'
        notificationType.value = 'success'
        notificationIcon.value = 'fa-solid fa-check'
        router.push('/login')
      } catch (error: any) {
        notificationMessage.value =
          error.response?.data?.message || 'Error en el registro'
        notificationType.value = 'error'
        notificationIcon.value = 'fa-solid fa-xmark'
      }
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
      isFormValid,
      handleRegister,
      notificationMessage,
      notificationType,
      notificationIcon
    }
  }
})
</script>
