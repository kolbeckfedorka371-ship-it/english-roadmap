<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()
const stats = ref({ totalDays: 12, streak: 5, totalMinutes: 180, videosWatched: 4, sentencesRead: 47, wordsCollected: computed(() => store.collectedWords.length) })

const calendarData = computed(() => {
  const data: { date: string; count: number }[] = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i)
    data.push({ date: d.toISOString().split('T')[0], count: i < 5 ? Math.floor(Math.random() * 4) + 1 : (Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0) })
  }
  return data
})

const achievements = [
  { icon: '🎬', title: '第一课', desc: '完成第一个视频学习', unlocked: true },
  { icon: '📝', title: '初试身手', desc: '完成10句跟读', unlocked: true },
  { icon: '🔥', title: '连续3天', desc: '连续学习3天', unlocked: true },
  { icon: '🔥🔥', title: '一周不断', desc: '连续学习7天', unlocked: false },
  { icon: '📖', title: '词汇收集者', desc: '收藏50个单词', unlocked: false },
  { icon: '🎤', title: '跟读达人', desc: '完成1000句跟读', unlocked: false },
  { icon: '🏆', title: 'Stage 1 完成', desc: '完成启蒙阶段', unlocked: false },
  { icon: '🚀', title: '六级达人', desc: '完成 Stage 6', unlocked: false },
]

function heatColor(count: number): string {
  if (count === 0) return 'bg-gray-800'
  if (count === 1) return 'bg-primary-900'
  if (count === 2) return 'bg-primary-700'
  if (count === 3) return 'bg-primary-500'
  return 'bg-primary-400'
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-extrabold mb-6"><span class="bg-gradient-to-r from-green-400 to-accent-400 bg-clip-text text-transparent">📊 学习统计</span></h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
      <div class="card text-center"><div class="text-3xl font-bold text-primary-400">{{ stats.totalDays }}</div><div class="text-sm text-gray-500 mt-1">学习天数</div></div>
      <div class="card text-center"><div class="text-3xl font-bold text-orange-400">{{ stats.streak }}🔥</div><div class="text-sm text-gray-500 mt-1">连续天数</div></div>
      <div class="card text-center"><div class="text-3xl font-bold text-green-400">3h0m</div><div class="text-sm text-gray-500 mt-1">学习时长</div></div>
      <div class="card text-center"><div class="text-3xl font-bold text-cyan-400">{{ stats.videosWatched }}</div><div class="text-sm text-gray-500 mt-1">学习视频</div></div>
      <div class="card text-center"><div class="text-3xl font-bold text-yellow-400">{{ stats.sentencesRead }}</div><div class="text-sm text-gray-500 mt-1">跟读句数</div></div>
      <div class="card text-center"><div class="text-3xl font-bold text-purple-400">{{ store.collectedWords.length }}</div><div class="text-sm text-gray-500 mt-1">收藏单词</div></div>
    </div>
    <div class="card mb-8">
      <h2 class="text-sm font-medium text-gray-400 mb-4">学习日历（最近30天）</h2>
      <div class="flex flex-wrap gap-1">
        <div v-for="day in calendarData" :key="day.date" class="w-8 h-8 rounded-md flex items-center justify-center text-[10px]" :class="heatColor(day.count)" :title="`${day.date}: ${day.count} 次学习`">{{ new Date(day.date).getDate() }}</div>
      </div>
      <div class="flex items-center gap-2 mt-3 text-[10px] text-gray-600"><span>少</span><div class="w-4 h-4 rounded bg-gray-800"></div><div class="w-4 h-4 rounded bg-primary-900"></div><div class="w-4 h-4 rounded bg-primary-700"></div><div class="w-4 h-4 rounded bg-primary-500"></div><div class="w-4 h-4 rounded bg-primary-400"></div><span>多</span></div>
    </div>
    <div class="card">
      <h2 class="text-sm font-medium text-gray-400 mb-4">🏆 成就徽章</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="a in achievements" :key="a.title" class="text-center p-3 rounded-xl transition-all" :class="a.unlocked ? 'bg-primary-600/10 border border-primary-500/20' : 'opacity-40 grayscale'">
          <div class="text-3xl mb-2">{{ a.icon }}</div>
          <div class="text-sm font-medium text-white">{{ a.title }}</div>
          <div class="text-[10px] text-gray-500 mt-1">{{ a.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
