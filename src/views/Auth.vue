<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const store = useAppStore()
const mode = ref<'login' | 'register'>('login')
const email = ref('')
const password = ref('')
const name = ref('')
const loading = ref(false)

function handleSubmit() {
  loading.value = true
  setTimeout(() => { store.login(email.value, password.value, name.value); loading.value = false; router.push('/') }, 500)
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold mb-4">E</div>
        <h1 class="text-2xl font-bold text-white">English Roadmap</h1>
        <p class="text-sm text-gray-500 mt-1">{{ mode === 'login' ? '登录你的账号' : '创建新账号' }}</p>
      </div>
      <div class="card">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="mode === 'register'"><label class="text-xs text-gray-500 mb-1 block">昵称</label><input v-model="name" class="input-field" placeholder="你的昵称"></div>
          <div><label class="text-xs text-gray-500 mb-1 block">邮箱</label><input v-model="email" type="email" class="input-field" placeholder="your@email.com" required></div>
          <div><label class="text-xs text-gray-500 mb-1 block">密码</label><input v-model="password" type="password" class="input-field" placeholder="至少6位" required minlength="6"></div>
          <button type="submit" class="btn-primary w-full py-2.5" :disabled="loading">{{ loading ? '处理中...' : (mode === 'login' ? '登录' : '注册') }}</button>
        </form>
        <div class="text-center mt-4"><button @click="mode = mode === 'login' ? 'register' : 'login'" class="text-sm text-primary-400 hover:text-primary-300">{{ mode === 'login' ? '没有账号？注册' : '已有账号？登录' }}</button></div>
      </div>
    </div>
  </div>
</template>
