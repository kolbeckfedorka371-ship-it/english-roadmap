<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import { useRouter } from 'vue-router'
import { stagesData } from '@/stores/appStore'

const store = useAppStore()
const router = useRouter()

const featuredVideos = [
  { id: 17, title: 'Steve Jobs Stanford 演讲', speaker: 'Steve Jobs', cefr: 'B1', icon: '🎤', platform: 'yt' },
  { id: 22, title: '马云：如果你不尝试', speaker: 'Jack Ma', cefr: 'B1', icon: '🇨🇳', platform: 'bili' },
  { id: 18, title: 'I Have a Dream', speaker: 'MLK', cefr: 'B1', icon: '✊', platform: 'yt' },
  { id: 25, title: 'How Great Leaders Inspire', speaker: 'Simon Sinek', cefr: 'B2', icon: '💡', platform: 'yt' },
  { id: 36, title: 'Bill Gates: Next Outbreak', speaker: 'Bill Gates', cefr: 'C1', icon: '🦠', platform: 'yt' },
  { id: 45, title: '雷军：永远相信美好的事情', speaker: '雷军', cefr: 'C1', icon: '📱', platform: 'bili' },
]

const cefrColors: Record<string, string> = {
  A0: 'bg-green-500/20 text-green-400', A1: 'bg-emerald-500/20 text-emerald-400',
  A2: 'bg-blue-500/20 text-blue-400', B1: 'bg-orange-500/20 text-orange-400',
  B2: 'bg-red-500/20 text-red-400', C1: 'bg-purple-500/20 text-purple-400',
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Hero -->
    <section class="text-center py-12 md:py-20">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-6">
        <span class="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
        通过世界经典演讲学英语
      </div>
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        <span class="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent">English Roadmap</span>
      </h1>
      <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
        从零基础到大学英语六级<br>
        通过 <span class="text-white font-medium">Steve Jobs</span>、<span class="text-white font-medium">马云</span>、<span class="text-white font-medium">TED 演讲</span> 学习英语
      </p>
      <div class="flex items-center justify-center gap-3">
        <button @click="router.push('/roadmap')" class="btn-primary text-base px-6 py-3">🚀 开始学习</button>
        <button @click="router.push('/search')" class="btn-ghost text-base px-6 py-3 border border-gray-700">🔍 搜索单词</button>
      </div>
    </section>

    <!-- Stats -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
      <div class="card text-center"><div class="text-2xl font-bold text-primary-400">6</div><div class="text-sm text-gray-500">学习阶段</div></div>
      <div class="card text-center"><div class="text-2xl font-bold text-accent-400">45+</div><div class="text-sm text-gray-500">精选视频</div></div>
      <div class="card text-center"><div class="text-2xl font-bold text-green-400">80+</div><div class="text-sm text-gray-500">核心词汇</div></div>
      <div class="card text-center"><div class="text-2xl font-bold text-orange-400">A0→C1</div><div class="text-sm text-gray-500">CEFR 等级</div></div>
    </section>

    <!-- Learning Route -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-5 flex items-center gap-2"><span class="text-primary-400">📚</span> 学习路线</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link v-for="stage in stagesData" :key="stage.id" :to="`/stage/${stage.id}`" class="card-clickable group">
          <div class="flex items-start gap-3">
            <div class="text-3xl">{{ stage.icon }}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs text-gray-500">{{ stage.subtitle }}</span>
                <span class="badge" :class="cefrColors[stage.cefr]">{{ stage.cefr }}</span>
              </div>
              <h3 class="font-semibold text-white group-hover:text-primary-400 transition-colors">{{ stage.title }}</h3>
              <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ stage.description }}</p>
              <div class="flex items-center gap-3 mt-3 text-xs text-gray-600">
                <span>📖 {{ stage.vocabRange }} 词</span><span>⏱ {{ stage.weeks }} 周</span>
                <span>🎬 {{ store.stageVideoCount(stage.id) }} 个视频</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Featured Speeches -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-5 flex items-center gap-2"><span class="text-accent-400">🎤</span> 经典演讲推荐</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link v-for="v in featuredVideos" :key="v.id" :to="`/video/${v.id}`" class="card-clickable group flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-2xl flex-shrink-0">{{ v.icon }}</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-white group-hover:text-primary-400 transition-colors truncate">{{ v.title }}</h3>
            <p class="text-sm text-gray-500">{{ v.speaker }}</p>
          </div>
          <div class="flex flex-col items-end gap-1">
            <span class="badge" :class="cefrColors[v.cefr]">{{ v.cefr }}</span>
            <span class="text-[10px] text-gray-600">{{ v.platform === 'bili' ? 'Bilibili' : 'YouTube' }}</span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Learning Philosophy -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-5 flex items-center gap-2"><span class="text-green-400">💡</span> 学习理念</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card"><div class="text-2xl mb-3">👂</div><h3 class="font-semibold text-white mb-2">听 → 模仿 → 跟读</h3><p class="text-sm text-gray-500">通过真实语境学习，不是背单词刷题。</p></div>
        <div class="card"><div class="text-2xl mb-3">🧠</div><h3 class="font-semibold text-white mb-2">学英语也学思想</h3><p class="text-sm text-gray-500">科技、创业、领导力、历史、社会 — 通过英语理解世界。</p></div>
        <div class="card"><div class="text-2xl mb-3">🔄</div><h3 class="font-semibold text-white mb-2">间隔重复记单词</h3><p class="text-sm text-gray-500">SM-2 算法科学安排复习，每个单词在最佳时间点出现。</p></div>
      </div>
    </section>
  </div>
</template>
