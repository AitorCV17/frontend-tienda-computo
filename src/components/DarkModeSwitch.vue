<!-- src/components/DarkModeSwitch.vue -->
<template>
  <button
    @click="toggleDarkMode"
    class="relative inline-flex items-center h-8 w-14 bg-gray-300 dark:bg-gray-600 rounded-full focus:outline-none transition-colors"
  >
    <!-- Cuando está en modo oscuro (isDark = true), queremos que el icono de luna aparezca a la izquierda -->
    <span
      v-if="isDark"
      class="absolute right-2 text-lg text-gray-300 pointer-events-none"
      style="top: 2px;"
    >
      <i class="fa-solid fa-moon"></i>
    </span>
    <!-- Cuando NO está en modo oscuro (isDark = false), queremos que el icono de sol aparezca a la derecha -->
    <span
      v-else
      class="absolute left-2 text-lg text-yellow-500 pointer-events-none"
      style="top: 2px;"
    >
      <i class="fa-solid fa-sun"></i>
    </span>

    <!-- Círculo deslizante -->
    <span
      class="inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform"
      :class="{
        'translate-x-1': isDark,
        'translate-x-7': !isDark
      }"
    ></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'DarkModeSwitch',
  setup() {
    const isDark = ref(false)

    onMounted(() => {
      const stored = localStorage.getItem('dark-mode')
      if (stored === 'true') {
        isDark.value = true
        document.documentElement.classList.add('dark')
      }
    })

    const toggleDarkMode = () => {
      isDark.value = !isDark.value
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('dark-mode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('dark-mode', 'false')
      }
    }

    return { isDark, toggleDarkMode }
  }
})
</script>
