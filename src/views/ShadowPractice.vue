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

const currentIdx = ref(0)
const isPlaying = ref(false)
const playbackRate = ref(1)
const loopMode = ref<'single' | 'continuous'>('single')
const isRecording = ref(false)
const recordingUrl = ref<string | null>(null)
const showWordPopup = ref(false)
const selectedWord = ref('')
const wordPopupPos = ref({ x: 0, y: 0 })

let mediaRecorder: MediaRecorder | null = null
let audioChunks: Blob[] = []
let player: any = null
let timeInterval: ReturnType<typeof setInterval>

const currentSentence = computed(() => video.value?.sentences[currentIdx.value])
const isBilibili = computed(() => video.value?.sourceType === 'bilibili')

function initPlayer() {
  if (!video.value || isBilibili.value) return
  if (!(window as any).YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  }
  const checkYT = setInterval(() => {
    if ((window as any).YT?.Player) {
      clearInterval(checkYT)
      player = new (window as any).YT.Player('shadow-yt-player', {
        videoId: video.value!.sourceId,
        playerVars: { autoplay: 0, controls: 0, rel: 0 },
        events: {
          onStateChange: (e: any) => {
            isPlaying.value = e.data === 1
            if (e.data === 0 && loopMode.value === 'single') seekToCurrent()
          },
        },
      })
    }
  }, 100)
  timeInterval = setInterval(() => {
    if (!player || !video.value || !currentSentence.value) return
    try {
      const t = player.getCurrentTime()
      if (t >= currentSentence.value.endSec && loopMode.value === 'single') seekToCurrent()
    } catch {}
  }, 200)
}
onMounted(initPlayer)
onUnmounted(() => clearInterval(timeInterval))

function seekToCurrent() {
  if (!player || !video.value) return
  player.seekTo(video.value.sentences[currentIdx.value].startSec, true)
  player.playVideo()
}
function playCurrent() { if (player) seekToCurrent() }
function pauseVideo() { if (player) player.pauseVideo() }
function prevSentence() { if (currentIdx.value > 0) { currentIdx.value--; recordingUrl.value = null; seekToCurrent() } }
function nextSentence() { if (video.value && currentIdx.value < video.value.sentences.length - 1) { currentIdx.value++; recordingUrl.value = null; seekToCurrent() } }
function selectSentence(idx: number) { currentIdx.value = idx; recordingUrl.value = null; seekToCurrent() }
function setRate(rate: number) { playbackRate.value = rate; if (player?.setPlaybackRate) player.setPlaybackRate(rate) }

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream); audioChunks = []
    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)
    mediaRecorder.onstop = () => {
      recordingUrl.value = URL.createObjectURL(new Blob(audioChunks, { type: 'audio/webm' }))
      stream.getTracks().forEach(t => t.stop())
    }
    mediaRecorder.start(); isRecording.value = true
  } catch { alert('无法访问麦克风，请允许麦克风权限') }
}
function stopRecording() { if (mediaRecorder?.state === 'recording') { mediaRecorder.stop(); isRecording.value = false } }
function playRecording() { if (recordingUrl.value) new Audio(recordingUrl.value).play() }

function onWordClick(word: string, event: MouseEvent) {
  selectedWord.value = word; wordPopupPos.value = { x: event.clientX, y: event.clientY }; showWordPopup.value = true
}
function splitWords(text: string) { return text.split(/\s+/).filter(Boolean) }
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-6" v-if="video">
    <button @click="router.back()" class="btn-ghost text-sm mb-4 flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      返回视频
    </button>
    <h1 class="text-xl font-bold mb-1">🎤 跟读模式</h1>
    <p class="text-sm text-gray-500 mb-6">{{ video.title }} — {{ video.speaker }}</p>

    <!-- Video (small, YouTube only) -->
    <div v-if="!isBilibili" class="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 max-h-[300px]">
      <div id="shadow-yt-player" class="absolute inset-0"></div>
    </div>
    <div v-else class="mb-6 p-4 bg-surface border border-gray-700 rounded-xl text-center text-sm text-gray-400">
      B站视频请在视频页面观看，跟读模式请使用下方音频控制
    </div>

    <!-- Current Sentence -->
    <div class="card text-center mb-6" v-if="currentSentence">
      <div class="text-2xl font-bold text-white leading-relaxed mb-3">
        <span v-for="(word, wi) in splitWords(currentSentence.en)" :key="wi" @click="onWordClick(word, $event)"
          class="cursor-pointer hover:text-primary-400 hover:underline transition-colors mr-2">{{ word }}</span>
      </div>
      <div class="text-base text-gray-400">{{ currentSentence.zh }}</div>
      <div class="text-xs text-gray-600 mt-2">{{ currentSentence.startSec }}s - {{ currentSentence.endSec }}s</div>
    </div>

    <!-- Controls -->
    <div class="card mb-6">
      <div class="flex items-center justify-center gap-3 mb-4">
        <button @click="prevSentence" class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white">⏮</button>
        <button @click="playCurrent" class="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white text-xl">▶</button>
        <button @click="pauseVideo" class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white">⏸</button>
        <button @click="nextSentence" class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white">⏭</button>
      </div>
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-500 mr-1">倍速</span>
          <button v-for="r in [0.5, 0.75, 1]" :key="r" @click="setRate(r)" class="px-2 py-1 text-xs rounded transition-colors"
            :class="playbackRate === r ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'">{{ r }}x</button>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-500 mr-1">循环</span>
          <button @click="loopMode = 'single'" class="px-2 py-1 text-xs rounded transition-colors"
            :class="loopMode === 'single' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'">单句</button>
          <button @click="loopMode = 'continuous'" class="px-2 py-1 text-xs rounded transition-colors"
            :class="loopMode === 'continuous' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'">连续</button>
        </div>
        <button @click="currentSentence && store.speak(currentSentence.en)" class="btn-ghost text-xs border border-gray-700">🔊 TTS朗读</button>
      </div>
    </div>

    <!-- Recording -->
    <div class="card mb-6 text-center">
      <h3 class="text-sm font-medium text-gray-400 mb-3">🎤 录音对比</h3>
      <div class="flex items-center justify-center gap-3">
        <button v-if="!isRecording" @click="startRecording" class="btn-primary px-4 py-2 flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500"></span> 开始录音
        </button>
        <button v-else @click="stopRecording" class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-white"></span> 停止录音
        </button>
        <button v-if="recordingUrl" @click="playRecording" class="btn-ghost border border-gray-700 flex items-center gap-2">🔊 播放录音</button>
      </div>
      <p v-if="recordingUrl" class="text-xs text-green-400 mt-2">✅ 录音完成，点击播放对比</p>
    </div>

    <!-- Sentence List -->
    <div class="card">
      <h3 class="text-sm font-medium text-gray-400 mb-3">全部句子 ({{ video.sentences.length }})</h3>
      <div class="space-y-1 max-h-[300px] overflow-y-auto">
        <div v-for="(s, idx) in video.sentences" :key="s.id" @click="selectSentence(idx)" class="p-3 rounded-lg cursor-pointer transition-all"
          :class="idx === currentIdx ? 'bg-primary-600/15 border border-primary-500/30' : 'hover:bg-gray-800/50 border border-transparent'">
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-600 w-6 text-right">{{ idx + 1 }}</span>
            <p class="text-sm text-gray-200">{{ s.en }}</p>
          </div>
          <p class="text-xs text-gray-500 ml-8">{{ s.zh }}</p>
        </div>
      </div>
    </div>
    <WordPopup v-if="showWordPopup" :word="selectedWord" :position="wordPopupPos" @close="showWordPopup = false" />
  </div>
</template>
