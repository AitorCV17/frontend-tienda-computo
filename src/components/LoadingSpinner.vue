<template>
  <div class="flex justify-center items-center h-48">
    <svg class="h-12 w-12 text-curious-blue-600 dark:text-curious-blue-400 animate-spin-slow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50">
      <circle class="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" />
      <path class="opacity-75" fill="currentColor" d="M25 5a20 20 0 00-6 39.3l4.7-4.1A15 15 0 1125 10v-5z"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoadingSpinner'
})
</script>
