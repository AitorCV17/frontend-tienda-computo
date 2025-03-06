<template>
  <div class="max-w-lg mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow-xl rounded">
    <h2 class="text-3xl font-bold mb-6 text-center">Mi Perfil</h2>
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label for="nombre" class="block text-gray-700 dark:text-gray-200 mb-1">Nombre</label>
        <input
          id="nombre"
          v-model="nombre"
          type="text"
          class="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        />
      </div>
      <div>
        <label for="email" class="block text-gray-700 dark:text-gray-200 mb-1">Correo</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        />
      </div>
      <div>
        <label for="password" class="block text-gray-700 dark:text-gray-200 mb-1">Nueva Contraseña</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
          placeholder="Déjalo en blanco si no quieres cambiar"
        />
      </div>
      <button class="btn-primary w-full">Guardar Cambios</button>
    </form>
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
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/auth'
import PopupNotification from '../components/PopupNotification.vue'

export default defineComponent({
  name: 'ProfileView',
  components: { PopupNotification },
  setup() {
    const authStore = useAuthStore()

    const nombre = ref('')
    const email = ref('')
    const password = ref('')
    const notificationMessage = ref('')
    const notificationType = ref('')
    const notificationIcon = ref('')

    onMounted(async () => {
      try {
        // Ajustamos la ruta a /auth/profile
        const { data } = await axios.get(
          import.meta.env.VITE_BACKEND_URL + '/auth/profile',
          {
            headers: { Authorization: `Bearer ${authStore.token}` }
          }
        )
        nombre.value = data.nombre
        email.value = data.email
      } catch (error: any) {
        notificationMessage.value = error.response?.data?.message || 'Error cargando perfil'
        notificationType.value = 'error'
        notificationIcon.value = 'fa-solid fa-xmark'
      }
    })

    const updateProfile = async () => {
      try {
        // Ajustamos la ruta a /auth/profile
        await axios.put(
          import.meta.env.VITE_BACKEND_URL + '/auth/profile',
          {
            nombre: nombre.value,
            email: email.value,
            password: password.value
          },
          {
            headers: { Authorization: `Bearer ${authStore.token}` }
          }
        )
        notificationMessage.value = 'Perfil actualizado correctamente'
        notificationType.value = 'success'
        notificationIcon.value = 'fa-solid fa-check'
        password.value = '' // Limpia password
      } catch (error: any) {
        notificationMessage.value =
          error.response?.data?.message || 'Error al actualizar perfil'
        notificationType.value = 'error'
        notificationIcon.value = 'fa-solid fa-xmark'
      }
    }

    return {
      nombre,
      email,
      password,
      updateProfile,
      notificationMessage,
      notificationType,
      notificationIcon
    }
  }
})
</script>
