<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()
const query = ref('')
const isListening = ref(false)
const selectedWord = ref<any>(null)
const showDetail = ref(false)
const recentSearches = ref<string[]>(JSON.parse(localStorage.getItem('recentSearches') || '[]'))

const results = computed(() => {
  if (!query.value.trim()) return []
  return store.searchWords(query.value).slice(0, 20)
})

const cefrColors: Record<string, string> = {
  A0: 'bg-green-500/20 text-green-400',
  A1: 'bg-emerald-500/20 text-emerald-400',
  A2: 'bg-blue-500/20 text-blue-400',
  B1: 'bg-orange-500/20 text-orange-400',
  B2: 'bg-red-500/20 text-red-400',
  C1: 'bg-purple-500/20 text-purple-400',
}

function speak(text: string, lang = 'en-US') {
  store.speak(text, lang)
}

function openDetail(word: any) {
  selectedWord.value = word
  showDetail.value = true
  // Add to recent
  if (!recentSearches.value.includes(word.word)) {
    recentSearches.value.unshift(word.word)
    if (recentSearches.value.length > 10) recentSearches.value.pop()
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  }
}

function startVoiceSearch() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('浏览器不支持语音识别')
    return
  }
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.interimResults = true
  isListening.value = true
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript
    query.value = transcript
  }
  recognition.onend = () => { isListening.value = false }
  recognition.onerror = () => { isListening.value = false }
  recognition.start()
}

function speakWordForPractice(word: string) {
  // 说单词，等用户跟读
  const synth = window.speechSynthesis
  synth.cancel()
  const utter = new SpeechSynthesisUtterance(word)
  utter.lang = 'en-US'
  utter.rate = 0.7
  utter.pitch = 1
  synth.speak(utter)
}

function clearRecent() {
  recentSearches.value = []
  localStorage.removeItem('recentSearches')
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-extrabold mb-2">
      <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">🔍 单词搜索</span>
    </h1>
    <p class="text-sm text-gray-500 mb-6">支持中文搜英文、英文搜中文</p>

    <!-- Search Box -->
    <div class="relative mb-6">
      <input
        v-model="query"
        class="w-full pl-4 pr-20 py-3.5 bg-surface border border-gray-700 rounded-xl text-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
        placeholder="输入中文或英文，如：成功 / success / 创业"
        autofocus
      >
      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <button
          @click="startVoiceSearch"
          class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
          :class="isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-gray-500 hover:text-white hover:bg-gray-800'"
          title="语音搜索"
        >
          🎤
        </button>
        <button v-if="query" @click="query = ''" class="w-10 h-10 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 flex items-center justify-center">
          ✕
        </button>
      </div>
    </div>

    <!-- Recent Searches -->
    <div v-if="!query && recentSearches.length > 0" class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-gray-500">最近搜索</span>
        <button @click="clearRecent" class="text-xs text-gray-600 hover:text-gray-400">清除</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="w in recentSearches"
          :key="w"
          @click="query = w"
          class="px-3 py-1.5 bg-surface-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {{ w }}
        </button>
      </div>
    </div>

    <!-- Quick Examples -->
    <div v-if="!query" class="mb-6">
      <span class="text-xs text-gray-500 mb-2 block">试试搜索：</span>
      <div class="flex flex-wrap gap-2">
        <button v-for="ex in ['成功','梦想','创造','believe','freedom','technology','创业','毅力']" :key="ex"
          @click="query = ex"
          class="px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg text-sm text-primary-400 hover:bg-primary-500/20 transition-colors">
          {{ ex }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="query" class="space-y-2">
      <div class="text-xs text-gray-500 mb-3">
        找到 {{ results.length }} 个结果
      </div>

      <div
        v-for="word in results"
        :key="word.id"
        @click="openDetail(word)"
        class="card-clickable flex items-center gap-3"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-bold text-white">{{ word.word }}</span>
            <span class="text-xs text-gray-500 font-mono">{{ word.phonetic }}</span>
            <span class="badge text-[10px]" :class="cefrColors[word.cefr]">{{ word.cefr }}</span>
          </div>
          <p class="text-sm text-gray-400">{{ word.defZh }}</p>
          <p class="text-xs text-gray-600 mt-0.5">{{ word.pos }} · {{ word.defEn }}</p>
        </div>
        <div class="flex items-center gap-1">
          <button @click.stop="speak(word.word)" class="w-8 h-8 rounded-lg text-gray-500 hover:text-primary-400 hover:bg-gray-800 flex items-center justify-center text-sm" title="发音">
            🔊
          </button>
          <button @click.stop="store.toggleCollect(word.id)" class="w-8 h-8 rounded-lg flex items-center justify-center text-sm" :class="store.isCollected(word.id) ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'">
            {{ store.isCollected(word.id) ? '⭐' : '☆' }}
          </button>
        </div>
      </div>

      <div v-if="results.length === 0" class="text-center py-12 text-gray-500">
        <p class="text-4xl mb-3">🔍</p>
        <p>未找到 "{{ query }}" 相关词汇</p>
        <p class="text-xs text-gray-600 mt-1">试试其他关键词</p>
      </div>
    </div>

    <!-- Word Detail Modal -->
    <Teleport to="body">
      <div v-if="showDetail && selectedWord" class="fixed inset-0 z-50 flex items-end md:items-center justify-center" @click.self="showDetail = false">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDetail = false"></div>
        <div class="relative bg-surface border border-gray-700 rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md z-10 max-h-[80vh] overflow-y-auto">
          <button @click="showDetail = false" class="absolute top-4 right-4 text-gray-500 hover:text-white text-lg">✕</button>

          <h2 class="text-3xl font-bold text-white mb-1">{{ selectedWord.word }}</h2>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-primary-400 font-mono text-lg">{{ selectedWord.phonetic }}</span>
            <span class="badge bg-gray-800 text-gray-400">{{ selectedWord.pos }}</span>
            <span class="badge" :class="cefrColors[selectedWord.cefr]">{{ selectedWord.cefr }}</span>
          </div>

          <!-- Pronunciation buttons -->
          <div class="flex items-center gap-2 mb-5">
            <button @click="speak(selectedWord.word, 'en-US')" class="btn-ghost border border-gray-700 flex items-center gap-2 text-sm">
              🔊 美式发音
            </button>
            <button @click="speak(selectedWord.word, 'en-GB')" class="btn-ghost border border-gray-700 flex items-center gap-2 text-sm">
              🔊 英式发音
            </button>
            <button @click="speakWordForPractice(selectedWord.word)" class="btn-ghost border border-gray-700 flex items-center gap-2 text-sm">
              🎤 跟读
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <div class="text-xs text-gray-600 mb-1">中文释义</div>
              <div class="text-lg text-white font-medium">{{ selectedWord.defZh }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-600 mb-1">英文释义</div>
              <div class="text-sm text-gray-400">{{ selectedWord.defEn }}</div>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4">
              <div class="text-xs text-gray-600 mb-2">例句</div>
              <p class="text-sm text-gray-200 italic mb-2">
                "{{ selectedWord.example }}"
                <button @click="speak(selectedWord.example)" class="ml-1 text-gray-500 hover:text-primary-400">🔊</button>
              </p>
              <p class="text-xs text-gray-500">{{ selectedWord.exampleZh }}</p>
            </div>
            <div v-if="selectedWord.tags?.length" class="flex flex-wrap gap-1">
              <span v-for="tag in selectedWord.tags" :key="tag" class="badge bg-gray-800 text-gray-500 text-xs">{{ tag }}</span>
            </div>
          </div>

          <button
            @click="store.toggleCollect(selectedWord.id)"
            class="w-full mt-5 py-2.5 rounded-lg font-medium transition-colors"
            :class="store.isCollected(selectedWord.id)
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'btn-primary'"
          >
            {{ store.isCollected(selectedWord.id) ? '⭐ 已收藏' : '☆ 收藏到单词本' }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
