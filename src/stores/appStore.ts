import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { allVideos, type Video, type Sentence } from '@/data/videos'
import { allWords, type Word } from '@/data/words'

export interface Stage {
  id: number
  title: string
  subtitle: string
  description: string
  cefr: string
  vocabRange: string
  weeks: number
  icon: string
}

export const stagesData: Stage[] = [
  { id: 1, title: '英语启蒙', subtitle: 'Stage 1', description: '从零开始，学习26个字母、自然拼读、48个音标和基础发音规则', cefr: 'A0', vocabRange: '0-500', weeks: 4, icon: '🌱' },
  { id: 2, title: '生存英语', subtitle: 'Stage 2', description: '掌握日常交流必备英语：问候、购物、交通、工作场景', cefr: 'A1', vocabRange: '500-1000', weeks: 8, icon: '🏠' },
  { id: 3, title: '初中英语', subtitle: 'Stage 3', description: '建立语法基础，提升听力和阅读能力', cefr: 'A2', vocabRange: '1000-2000', weeks: 12, icon: '📖' },
  { id: 4, title: '高中英语', subtitle: 'Stage 4', description: '复杂句型、从句、阅读理解和表达训练', cefr: 'B1', vocabRange: '2000-3500', weeks: 16, icon: '🎯' },
  { id: 5, title: 'CET-4 冲刺', subtitle: 'Stage 5', description: '四级词汇、听力、阅读和写作全面训练', cefr: 'B2', vocabRange: '4500+', weeks: 20, icon: '🏆' },
  { id: 6, title: 'CET-6 进阶', subtitle: 'Stage 6', description: '六级词汇、新闻英语、学术英语和高级阅读', cefr: 'C1', vocabRange: '6000+', weeks: 24, icon: '🚀' },
]

export const useAppStore = defineStore('app', () => {
  const videos = ref<Video[]>(allVideos)
  const words = ref<Word[]>(allWords)
  const collectedWordIds = ref<Set<number>>(new Set(
    JSON.parse(localStorage.getItem('collectedWords') || '[]')
  ))
  const user = ref<any>(JSON.parse(localStorage.getItem('user') || 'null'))

  // Getters
  const getStage = (id: number) => stagesData.find(s => s.id === id)

  const getVideosByStage = (stageId: number) =>
    videos.value.filter(v => v.stageId === stageId)

  const getVideo = (id: number) =>
    videos.value.find(v => v.id === id)

  const getWord = (word: string) =>
    words.value.find(w => w.word === word.toLowerCase().replace(/[^a-zA-Z'-]/g, ''))

  const getWordById = (id: number) =>
    words.value.find(w => w.id === id)

  const collectedWords = computed(() =>
    words.value.filter(w => collectedWordIds.value.has(w.id))
  )

  const stageVideoCount = (stageId: number) =>
    videos.value.filter(v => v.stageId === stageId).length

  // Word search - 支持中搜英、英搜中
  const searchWords = (query: string) => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return words.value.filter(w =>
      w.word.toLowerCase().includes(q) ||
      w.defZh.includes(q) ||
      w.defEn.toLowerCase().includes(q) ||
      (w.tags && w.tags.some(t => t.includes(q)))
    )
  }

  // Collect word
  const toggleCollect = (wordId: number) => {
    if (collectedWordIds.value.has(wordId)) {
      collectedWordIds.value.delete(wordId)
    } else {
      collectedWordIds.value.add(wordId)
    }
    localStorage.setItem('collectedWords', JSON.stringify([...collectedWordIds.value]))
  }

  const isCollected = (wordId: number) => collectedWordIds.value.has(wordId)

  // Auth
  const login = (email: string, password: string, name?: string) => {
    const u = { email, name: name || email.split('@')[0], token: 'jwt-' + Date.now() }
    user.value = u
    localStorage.setItem('user', JSON.stringify(u))
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  // TTS
  const speak = (text: string, lang = 'en-US') => {
    const synth = window.speechSynthesis
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = 0.9
    synth.speak(utter)
  }

  return {
    videos, words, collectedWordIds, user,
    getStage, getVideosByStage, getVideo, getWord, getWordById,
    collectedWords, stageVideoCount, searchWords,
    toggleCollect, isCollected,
    login, logout, speak,
  }
})
