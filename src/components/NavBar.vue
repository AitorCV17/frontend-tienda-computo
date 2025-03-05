<template>
  <nav ref="navBarRef" class="bg-gradient-to-r from-curious-blue-500 via-curious-blue-600 to-curious-blue-700 text-white shadow p-4 dark:bg-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img src="../assets/hero.jpg" alt="Logo" class="h-10 w-10 rounded-full object-cover" />
        <span class="text-xl font-bold">Tienda Computación</span>
      </div>

      <div class="hidden md:flex space-x-6">
        <router-link to="/" class="hover:underline flex items-center">
          <i class="fa-solid fa-house mr-1"></i>
          Inicio
        </router-link>
        <router-link to="/products" class="hover:underline flex items-center">
          <i class="fa-solid fa-list mr-1"></i>
          Productos
        </router-link>
        <router-link to="/cart" class="hover:underline flex items-center">
          <i class="fa-solid fa-cart-shopping mr-1"></i>
          Carrito
        </router-link>
      </div>

      <div class="hidden md:flex items-center space-x-4 relative">
        <template v-if="!authStore.isLoggedIn">
          <router-link to="/login" class="hover:underline flex items-center">
            <i class="fa-solid fa-user mr-1"></i>
            Iniciar Sesión
          </router-link>
        </template>
        <template v-else>
          <button @click.stop="toggleDropdown" class="focus:outline-none relative">
            <i class="fa-solid fa-user-circle text-3xl"></i>
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute w-44 shadow-lg rounded z-50 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
            style="top: 2.6rem; left: -1rem;"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
            >
              <i class="fa-solid fa-id-card mr-2"></i>
              Perfil
            </router-link>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
            >
              <i class="fa-solid fa-right-from-bracket mr-2"></i>
              Cerrar Sesión
            </button>
          </div>
        </template>
      </div>

      <DarkModeSwitch />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import DarkModeSwitch from './DarkModeSwitch.vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavBar',
  components: { DarkModeSwitch },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const dropdownOpen = ref(false)
    const navBarRef = ref<HTMLElement | null>(null)

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const logout = () => {
      authStore.logout()
      dropdownOpen.value = false
      router.push('/')
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownOpen.value) return
      if (navBarRef.value && !navBarRef.value.contains(e.target as Node)) {
        dropdownOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      authStore,
      dropdownOpen,
      toggleDropdown,
      logout,
      navBarRef
    }
  }
})
</script>
