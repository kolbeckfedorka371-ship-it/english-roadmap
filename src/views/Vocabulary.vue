<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()
const activeTab = ref<'all' | 'collected' | 'review'>('all')
const searchQuery = ref('')
const selectedWord = ref<any>(null)
const showDetail = ref(false)
const reviewMode = ref(false)
const reviewIdx = ref(0)
const showAnswer = ref(false)

const cefrColors: Record<string, string> = {
  A0:'bg-green-500/20 text-green-400', A1:'bg-emerald-500/20 text-emerald-400', A2:'bg-blue-500/20 text-blue-400',
  B1:'bg-orange-500/20 text-orange-400', B2:'bg-red-500/20 text-red-400', C1:'bg-purple-500/20 text-purple-400',
}

const filteredWords = computed(() => {
  let w = activeTab.value === 'collected' ? store.collectedWords : store.words
  if (searchQuery.value) { const q = searchQuery.value.toLowerCase(); w = w.filter(x => x.word.includes(q) || x.defZh.includes(q)) }
  return w
})

function openDetail(word: any) { selectedWord.value = word; showDetail.value = true }
function startReview() {
  if (store.collectedWords.length === 0) return
  reviewMode.value = true; reviewIdx.value = 0; showAnswer.value = false
}
function nextReview() {
  if (reviewIdx.value < store.collectedWords.length - 1) { reviewIdx.value++; showAnswer.value = false }
  else reviewMode.value = false
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-extrabold mb-6"><span class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">📖 单词本</span></h1>

    <!-- Review Mode -->
    <div v-if="reviewMode" class="max-w-lg mx-auto">
      <div class="text-center mb-4"><span class="text-sm text-gray-500">{{ reviewIdx + 1 }} / {{ store.collectedWords.length }}</span></div>
      <div class="card text-center py-10" v-if="store.collectedWords[reviewIdx]">
        <h2 class="text-3xl font-bold text-white mb-2">{{ store.collectedWords[reviewIdx].word }}</h2>
        <p class="text-primary-400 font-mono mb-2">{{ store.collectedWords[reviewIdx].phonetic }}</p>
        <button @click="store.speak(store.collectedWords[reviewIdx].word)" class="text-sm text-gray-500 hover:text-primary-400 mb-4">🔊 听发音</button>
        <button v-if="!showAnswer" @click="showAnswer = true" class="btn-primary px-6 py-2 block mx-auto">显示释义</button>
        <div v-else class="space-y-3">
          <p class="text-lg text-gray-200">{{ store.collectedWords[reviewIdx].defZh }}</p>
          <p class="text-sm text-gray-400">{{ store.collectedWords[reviewIdx].defEn }}</p>
          <div class="flex items-center justify-center gap-2 mt-6">
            <button @click="nextReview()" class="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg text-sm">😟 不记得</button>
            <button @click="nextReview()" class="px-3 py-1.5 bg-yellow-600/20 text-yellow-400 rounded-lg text-sm">😐 有点印象</button>
            <button @click="nextReview()" class="px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-sm">😊 记住了</button>
          </div>
        </div>
      </div>
      <button @click="reviewMode = false" class="btn-ghost w-full mt-4 border border-gray-700">退出复习</button>
    </div>

    <!-- Normal Mode -->
    <div v-else>
      <div class="flex items-center gap-1 mb-6 bg-surface rounded-lg p-1 w-fit">
        <button @click="activeTab = 'all'" class="px-4 py-2 text-sm rounded-md transition-colors" :class="activeTab === 'all' ? 'bg-primary-600 text-white' : 'text-gray-400'">全部 ({{ store.words.length }})</button>
        <button @click="activeTab = 'collected'" class="px-4 py-2 text-sm rounded-md transition-colors" :class="activeTab === 'collected' ? 'bg-primary-600 text-white' : 'text-gray-400'">⭐ 已收藏 ({{ store.collectedWords.length }})</button>
      </div>
      <div class="flex items-center gap-3 mb-6">
        <input v-model="searchQuery" class="input-field flex-1" placeholder="搜索单词或中文...">
        <button v-if="activeTab === 'collected' && store.collectedWords.length > 0" @click="startReview" class="btn-primary whitespace-nowrap">📝 复习</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="word in filteredWords" :key="word.id" class="card-clickable" @click="openDetail(word)">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-white text-lg">{{ word.word }}</span>
                <span class="text-xs text-gray-500 font-mono">{{ word.phonetic }}</span>
                <span class="badge text-[10px]" :class="cefrColors[word.cefr]">{{ word.cefr }}</span>
              </div>
              <p class="text-sm text-gray-400">{{ word.defZh }}</p>
            </div>
            <div class="flex items-center gap-1">
              <button @click.stop="store.speak(word.word)" class="text-sm text-gray-600 hover:text-primary-400">🔊</button>
              <button @click.stop="store.toggleCollect(word.id)" class="text-lg" :class="store.isCollected(word.id) ? 'text-yellow-400' : 'text-gray-600'">{{ store.isCollected(word.id) ? '⭐' : '☆' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div v-if="showDetail && selectedWord" class="fixed inset-0 z-50 flex items-end md:items-center justify-center" @click.self="showDetail = false">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDetail = false"></div>
        <div class="relative bg-surface border border-gray-700 rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md z-10">
          <button @click="showDetail = false" class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
          <h2 class="text-2xl font-bold text-white mb-1">{{ selectedWord.word }}</h2>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-primary-400 font-mono">{{ selectedWord.phonetic }}</span>
            <span class="badge bg-gray-800 text-gray-400">{{ selectedWord.pos }}</span>
          </div>
          <div class="flex items-center gap-2 mb-4">
            <button @click="store.speak(selectedWord.word, 'en-US')" class="btn-ghost border border-gray-700 text-sm">🔊 美式</button>
            <button @click="store.speak(selectedWord.word, 'en-GB')" class="btn-ghost border border-gray-700 text-sm">🔊 英式</button>
          </div>
          <p class="text-gray-200 mb-1">{{ selectedWord.defZh }}</p>
          <p class="text-sm text-gray-500 mb-3">{{ selectedWord.defEn }}</p>
          <div class="bg-gray-800/50 rounded-lg p-3 mb-4">
            <p class="text-sm text-gray-300 italic">"{{ selectedWord.example }}"</p>
          </div>
          <button @click="store.toggleCollect(selectedWord.id)" class="w-full py-2.5 rounded-lg font-medium" :class="store.isCollected(selectedWord.id) ? 'bg-yellow-500/20 text-yellow-400' : 'btn-primary'">
            {{ store.isCollected(selectedWord.id) ? '⭐ 已收藏' : '☆ 收藏' }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
