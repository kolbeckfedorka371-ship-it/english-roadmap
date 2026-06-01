<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'

const props = defineProps<{ word: string; position: { x: number; y: number } }>()
const emit = defineEmits(['close'])
const store = useAppStore()

const cleanWord = computed(() => props.word.replace(/[^a-zA-Z'-]/g, '').toLowerCase())
const wordData = computed(() => store.getWord(cleanWord.value))

const popupStyle = computed(() => {
  const x = Math.min(props.position.x, window.innerWidth - 320)
  const y = props.position.y < window.innerHeight / 2 ? props.position.y + 10 : props.position.y - 200
  return { left: `${Math.max(10, x)}px`, top: `${Math.max(10, y)}px` }
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100]" @click="emit('close')"></div>
    <div class="fixed z-[101] w-72 bg-surface border border-gray-700 rounded-xl shadow-2xl p-4" :style="popupStyle" style="animation: popIn 0.15s ease-out">
      <div v-if="wordData">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-bold text-white">{{ wordData.word }}</h3>
          <div class="flex items-center gap-1">
            <button @click="store.speak(wordData.word)" class="text-sm text-gray-500 hover:text-primary-400">🔊</button>
            <button @click="store.toggleCollect(wordData.id)" class="text-lg" :class="store.isCollected(wordData.id) ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'">
              {{ store.isCollected(wordData.id) ? '⭐' : '☆' }}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm text-primary-400 font-mono">{{ wordData.phonetic }}</span>
          <span class="badge bg-gray-800 text-gray-400">{{ wordData.pos }}</span>
          <span class="badge bg-green-500/20 text-green-400">{{ wordData.cefr }}</span>
        </div>
        <p class="text-sm text-gray-300 mb-2">{{ wordData.defZh }}</p>
        <p class="text-xs text-gray-500 mb-3">{{ wordData.defEn }}</p>
        <div class="bg-gray-800/50 rounded-lg p-3">
          <p class="text-sm text-gray-300 italic">"{{ wordData.example }}"</p>
          <p class="text-xs text-gray-500 mt-1">{{ wordData.exampleZh }}</p>
        </div>
      </div>
      <div v-else>
        <h3 class="text-lg font-bold text-white mb-1">{{ cleanWord }}</h3>
        <p class="text-sm text-gray-500">词典中未收录</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
</style>
