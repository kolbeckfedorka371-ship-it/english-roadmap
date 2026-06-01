<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import WordPopup from '@/components/word/WordPopup.vue'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const videoId = Number(route.params.id)
const video = computed(() => store.getVideo(videoId))

const currentSentenceIdx = ref(0)
const currentTime = ref(0)
const isPlaying = ref(false)
const playbackRate = ref(1)
const showWordPopup = ref(false)
const selectedWord = ref('')
const wordPopupPos = ref({ x: 0, y: 0 })
const activeTab = ref<'subtitle' | 'info'>('subtitle')
const playerReady = ref(false)

let player: any = null
let timeInterval: ReturnType<typeof setInterval>

function initPlayer() {
  if (!video.value) return
  if (video.value.sourceType === 'bilibili') {
    playerReady.value = true
    return
  }
  // YouTube IFrame API
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(tag);
  (window as any).onYouTubeIframeAPIReady = () => {
    player = new (window as any).YT.Player('yt-player', {
      videoId: video.value!.sourceId,
      playerVars: { autoplay: 0, controls: 1, rel: 0, modestbranding: 1 },
      events: {
        onReady: () => { playerReady.value = true },
        onStateChange: (e: any) => { isPlaying.value = e.data === 1 },
      },
    })
  }
  timeInterval = setInterval(() => {
    if (player?.getCurrentTime) {
      currentTime.value = player.getCurrentTime()
      updateCurrentSentence()
    }
  }, 200)
}

onMounted(initPlayer)
onUnmounted(() => clearInterval(timeInterval))

function updateCurrentSentence() {
  if (!video.value) return
  const t = currentTime.value
  for (let i = 0; i < video.value.sentences.length; i++) {
    if (t >= video.value.sentences[i].startSec && t < video.value.sentences[i].endSec) {
      currentSentenceIdx.value = i
      break
    }
  }
}

function seekToSentence(idx: number) {
  if (!video.value) return
  currentSentenceIdx.value = idx
  if (player) {
    player.seekTo(video.value.sentences[idx].startSec, true)
    player.playVideo()
  }
}

function togglePlay() {
  if (!player) return
  if (isPlaying.value) player.pauseVideo()
  else player.playVideo()
}

function setRate(rate: number) {
  playbackRate.value = rate
  if (player?.setPlaybackRate) player.setPlaybackRate(rate)
}

function onWordClick(word: string, event: MouseEvent) {
  selectedWord.value = word
  wordPopupPos.value = { x: event.clientX, y: event.clientY }
  showWordPopup.value = true
}

function splitWords(text: string) { return text.split(/\s+/).filter(Boolean) }

const currentSentence = computed(() => video.value?.sentences[currentSentenceIdx.value])
const bilibiliUrl = computed(() => video.value ? `https://player.bilibili.com/player.html?bvid=${video.value.sourceId}&high_quality=1` : '')
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6" v-if="video">
    <button @click="router.back()" class="btn-ghost text-sm mb-4 flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      返回
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Video + Controls -->
      <div class="lg:col-span-2">
        <!-- YouTube Player -->
        <div v-if="video.sourceType === 'youtube'" class="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
          <div id="yt-player" class="absolute inset-0"></div>
        </div>

        <!-- Bilibili Player -->
        <div v-else class="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
          <iframe
            :src="bilibiliUrl"
            class="absolute inset-0 w-full h-full"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Chinese Original Badge -->
        <div v-if="video.isChineseOriginal" class="mb-3 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-400 flex items-center gap-2">
          🇨🇳 中文原声 · 英文字幕翻译
        </div>

        <!-- Video Info -->
        <div class="mb-4">
          <h1 class="text-xl font-bold text-white mb-1">{{ video.title }}</h1>
          <div class="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
            <span>🎤 {{ video.speaker }}</span>
            <span>⏱ {{ video.duration }}</span>
            <span class="badge bg-orange-500/20 text-orange-400">{{ video.cefr }}</span>
            <span v-if="video.sourceType === 'bilibili'" class="badge bg-cyan-500/20 text-cyan-400">Bilibili</span>
            <span v-else class="badge bg-red-500/20 text-red-400">YouTube</span>
          </div>
          <p class="text-sm text-gray-400 mt-2">{{ video.description }}</p>
        </div>

        <!-- Playback Controls -->
        <div class="card flex items-center gap-3 flex-wrap">
          <button v-if="video.sourceType === 'youtube'" @click="togglePlay" class="btn-primary px-3 py-1.5 text-sm">
            {{ isPlaying ? '⏸ 暂停' : '▶ 播放' }}
          </button>
          <div v-if="video.sourceType === 'youtube'" class="flex items-center gap-1">
            <span class="text-xs text-gray-500 mr-1">倍速</span>
            <button v-for="r in [0.5, 0.75, 1, 1.25]" :key="r" @click="setRate(r)"
              class="px-2 py-1 text-xs rounded transition-colors"
              :class="playbackRate === r ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'">
              {{ r }}x
            </button>
          </div>
          <router-link :to="`/shadow/${video.id}`" class="btn-ghost text-sm border border-gray-700">🎤 跟读模式</router-link>
        </div>

        <!-- Current sentence highlight -->
        <div v-if="currentSentence" class="mt-4 p-4 rounded-xl bg-primary-600/10 border border-primary-500/20">
          <div class="text-lg text-white font-medium leading-relaxed mb-2">
            <span v-for="(word, wi) in splitWords(currentSentence.en)" :key="wi"
              @click="onWordClick(word, $event)"
              class="cursor-pointer hover:text-primary-400 hover:underline decoration-primary-400/50 transition-colors mr-1.5">
              {{ word }}
            </span>
          </div>
          <div class="text-sm text-gray-400">{{ currentSentence.zh }}</div>
        </div>
      </div>

      <!-- Right: Subtitle Panel -->
      <div class="lg:col-span-1">
        <div class="card h-fit max-h-[calc(100vh-200px)] overflow-hidden flex flex-col">
          <div class="flex border-b border-gray-800 mb-3">
            <button @click="activeTab = 'subtitle'" class="flex-1 py-2 text-sm font-medium transition-colors"
              :class="activeTab === 'subtitle' ? 'text-primary-400 border-b-2 border-primary-400' : 'text-gray-500'">字幕</button>
            <button @click="activeTab = 'info'" class="flex-1 py-2 text-sm font-medium transition-colors"
              :class="activeTab === 'info' ? 'text-primary-400 border-b-2 border-primary-400' : 'text-gray-500'">信息</button>
          </div>

          <div v-if="activeTab === 'subtitle'" class="overflow-y-auto flex-1 space-y-1 pr-1">
            <div v-for="(s, idx) in video.sentences" :key="s.id" @click="seekToSentence(idx)"
              class="p-3 rounded-lg cursor-pointer transition-all duration-200"
              :class="idx === currentSentenceIdx ? 'bg-primary-600/15 border border-primary-500/30' : 'hover:bg-gray-800/50 border border-transparent'">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] text-gray-600 font-mono">{{ s.startSec }}s</span>
                <span v-if="idx === currentSentenceIdx" class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
              </div>
              <p class="text-sm text-gray-200 leading-relaxed">
                <span v-for="(word, wi) in splitWords(s.en)" :key="wi" @click.stop="onWordClick(word, $event)"
                  class="cursor-pointer hover:text-primary-400 transition-colors mr-1">{{ word }}</span>
              </p>
              <p class="text-xs text-gray-500 mt-1">{{ s.zh }}</p>
              <div v-if="s.keywords.length" class="flex flex-wrap gap-1 mt-2">
                <span v-for="kw in s.keywords" :key="kw" class="text-[10px] px-1.5 py-0.5 bg-primary-500/10 text-primary-400 rounded">{{ kw }}</span>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'info'" class="text-sm text-gray-400 space-y-3">
            <div><div class="text-xs text-gray-600 mb-1">演讲者</div><div class="text-white">{{ video.speaker }}</div></div>
            <div><div class="text-xs text-gray-600 mb-1">难度等级</div><div class="text-white">{{ video.cefr }}</div></div>
            <div><div class="text-xs text-gray-600 mb-1">时长</div><div class="text-white">{{ video.duration }}</div></div>
            <div><div class="text-xs text-gray-600 mb-1">来源</div><div class="text-white">{{ video.sourceType === 'bilibili' ? 'Bilibili' : 'YouTube' }}</div></div>
            <div><div class="text-xs text-gray-600 mb-1">标签</div>
              <div class="flex flex-wrap gap-1"><span v-for="tag in video.tags" :key="tag" class="badge bg-gray-800 text-gray-400">{{ tag }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <WordPopup v-if="showWordPopup" :word="selectedWord" :position="wordPopupPos" @close="showWordPopup = false" />
  </div>

  <div v-else class="text-center py-20 text-gray-500">
    <p>视频未找到</p>
    <button @click="router.push('/roadmap')" class="btn-primary mt-4">返回路线</button>
  </div>
</template>
