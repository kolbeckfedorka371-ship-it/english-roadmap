<script setup lang="ts">
import { useAppStore, stagesData } from '@/stores/appStore'
const store = useAppStore()
const cefrColors: Record<string, string> = {
  A0:'from-green-500 to-emerald-600', A1:'from-emerald-500 to-teal-600', A2:'from-blue-500 to-cyan-500',
  B1:'from-orange-500 to-amber-500', B2:'from-red-500 to-rose-600', C1:'from-indigo-500 to-blue-600',
}
const cefrBadge: Record<string, string> = {
  A0:'bg-green-500/20 text-green-400', A1:'bg-emerald-500/20 text-emerald-400', A2:'bg-blue-500/20 text-blue-400',
  B1:'bg-orange-500/20 text-orange-400', B2:'bg-red-500/20 text-red-400', C1:'bg-purple-500/20 text-purple-400',
}
</script>
<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-extrabold mb-3"><span class="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">学习路线</span></h1>
      <p class="text-gray-500">从英语零基础到大学英语六级的完整学习路径</p>
    </div>
    <div class="relative">
      <div class="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-primary-500 to-purple-500 hidden md:block"></div>
      <div class="space-y-6">
        <router-link v-for="(stage, idx) in stagesData" :key="stage.id" :to="`/stage/${stage.id}`" class="block group">
          <div class="flex gap-4 md:gap-6">
            <div class="hidden md:flex flex-col items-center">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-xl font-bold shadow-lg z-10" :class="cefrColors[stage.cefr]">{{ stage.icon }}</div>
            </div>
            <div class="flex-1 card-clickable">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-medium text-gray-500">{{ stage.subtitle }}</span>
                <span class="badge" :class="cefrBadge[stage.cefr]">{{ stage.cefr }}</span>
                <span v-if="idx === 0" class="badge bg-primary-500/20 text-primary-400">当前</span>
              </div>
              <h3 class="text-lg font-bold text-white group-hover:text-primary-400 transition-colors mb-1">{{ stage.title }}</h3>
              <p class="text-sm text-gray-500 mb-4">{{ stage.description }}</p>
              <div class="flex items-center gap-4 text-xs text-gray-600">
                <span>📖 {{ stage.vocabRange }} 词</span>
                <span>⏱ {{ stage.weeks }} 周</span>
                <span>🎬 {{ store.stageVideoCount(stage.id) }} 个视频</span>
              </div>
              <div class="mt-4" v-if="idx < 2">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-gray-500">学习进度</span>
                  <span class="text-primary-400">{{ idx === 0 ? '30%' : '0%' }}</span>
                </div>
                <div class="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all" :style="{ width: idx === 0 ? '30%' : '0%' }"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="idx < stagesData.length - 1" class="flex justify-center py-2">
            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
