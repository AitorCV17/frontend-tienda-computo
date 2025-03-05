<template>
  <div class="p-6 text-center">
    <LoadingSpinner />
    <p class="mt-4 text-gray-700 dark:text-gray-300">
      Procesando inicio de sesión con Google...
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRoute, useRouter } from 'vue-router'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default defineComponent({
  name: 'GoogleCallbackView',
  components: { LoadingSpinner },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

    onMounted(() => {
      const token = route.query.token as string
      if (token) {
        authStore.setToken(token)
        router.push('/')
      } else {
        router.push('/login')
      }
    })

    return {}
  }
})
</script>
