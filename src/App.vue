<!-- src/App.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <transition name="fade" mode="out-in">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </transition>
    <FooterBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
export default defineComponent({
  name: 'App',
  components: { NavBar, FooterBar }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
