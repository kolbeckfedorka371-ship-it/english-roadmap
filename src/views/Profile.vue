<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
const router = useRouter()
const store = useAppStore()
</script>

<template>
  <div class="max-w-lg mx-auto px-4 py-8">
    <h1 class="text-2xl font-extrabold mb-6"><span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">👤 个人中心</span></h1>
    <div v-if="store.user" class="space-y-4">
      <div class="card text-center py-8">
        <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold mb-4">{{ store.user.name?.[0]?.toUpperCase() || 'U' }}</div>
        <h2 class="text-xl font-bold text-white">{{ store.user.name }}</h2>
        <p class="text-sm text-gray-500">{{ store.user.email }}</p>
      </div>
      <div class="card space-y-2">
        <router-link to="/vocabulary" class="flex items-center justify-between py-2 text-gray-300 hover:text-white"><span>📖 我的单词本</span><span class="text-sm text-gray-500">{{ store.collectedWords.length }} 个</span></router-link>
        <router-link to="/stats" class="flex items-center justify-between py-2 text-gray-300 hover:text-white"><span>📊 学习统计</span></router-link>
        <router-link to="/search" class="flex items-center justify-between py-2 text-gray-300 hover:text-white"><span>🔍 搜索单词</span></router-link>
      </div>
      <button @click="store.logout(); router.push('/auth')" class="w-full py-2.5 text-red-400 text-sm border border-red-500/20 rounded-lg hover:bg-red-500/5">退出登录</button>
    </div>
    <div v-else class="text-center py-12"><p class="text-gray-500 mb-4">请先登录</p><button @click="router.push('/auth')" class="btn-primary">去登录</button></div>
  </div>
</template>
