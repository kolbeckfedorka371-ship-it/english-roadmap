<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import MobileNav from './components/layout/MobileNav.vue'

const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex flex-col">
    <AppHeader @toggle-menu="mobileMenuOpen = !mobileMenuOpen" />
    <main class="flex-1 pb-20 md:pb-0">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <MobileNav />
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
