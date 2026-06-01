<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const courseId = Number(route.params.id)
const video = computed(() => store.getVideo(courseId))
const videos = computed(() => {
  // Get all videos for the stage that contains this video
  if (!video.value) return []
  return store.getVideosByStage(video.value.stageId)
})

const cefrBadge: Record<string, string> = {
  A0: 'bg-green-500/20 text-green-400',
  A1: 'bg-emerald-500/20 text-emerald-400',
  A2: 'bg-blue-500/20 text-blue-400',
  B1: 'bg-orange-500/20 text-orange-400',
  B2: 'bg-red-500/20 text-red-400',
  C1: 'bg-purple-500/20 text-purple-400',
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8" v-if="course">
    <button @click="router.back()" class="btn-ghost text-sm mb-6 flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      返回
    </button>

    <div class="mb-8">
      <h1 class="text-2xl font-extrabold text-white mb-2">{{ course.title }}</h1>
      <p class="text-gray-400">{{ course.description }}</p>
    </div>

    <div class="space-y-3">
      <router-link
        v-for="(video, idx) in course.videos"
        :key="video.id"
        :to="`/video/${video.id}`"
        class="card-clickable flex items-center gap-4"
      >
        <div class="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center text-primary-400 font-bold flex-shrink-0">
          {{ idx + 1 }}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-white truncate">{{ video.title }}</h3>
          <div class="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>🎤 {{ video.speaker }}</span>
            <span>⏱ {{ video.duration }}</span>
            <span class="badge text-[10px]" :class="cefrBadge[video.cefr]">{{ video.cefr }}</span>
          </div>
          <div class="flex flex-wrap gap-1 mt-2">
            <span v-for="tag in video.tags.slice(0, 3)" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-500 rounded">{{ tag }}</span>
          </div>
        </div>
        <svg class="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
        </svg>
      </router-link>
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-500">
    <p>课程未找到</p>
    <button @click="router.push('/roadmap')" class="btn-primary mt-4">返回路线</button>
  </div>
</template>
