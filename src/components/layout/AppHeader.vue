<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <header class="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">E</div>
        <span class="font-bold text-lg text-white hidden sm:block">English <span class="text-primary-400">Roadmap</span></span>
      </router-link>

      <nav class="hidden md:flex items-center gap-1">
        <router-link to="/roadmap" class="btn-ghost text-sm" active-class="!text-primary-400 !bg-primary-500/10">📚 路线</router-link>
        <router-link to="/search" class="btn-ghost text-sm" active-class="!text-primary-400 !bg-primary-500/10">🔍 搜词</router-link>
        <router-link to="/vocabulary" class="btn-ghost text-sm" active-class="!text-primary-400 !bg-primary-500/10">📖 单词本</router-link>
        <router-link to="/stats" class="btn-ghost text-sm" active-class="!text-primary-400 !bg-primary-500/10">📊 统计</router-link>
      </nav>

      <router-link to="/auth" class="btn-primary text-sm px-3 py-1.5">登录</router-link>
    </div>
  </header>
</template>
