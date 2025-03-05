<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default defineComponent({
  name: 'App',
  components: { NavBar, FooterBar }
})
</script>
