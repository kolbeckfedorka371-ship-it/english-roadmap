import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/roadmap', name: 'roadmap', component: () => import('../views/Roadmap.vue') },
    { path: '/stage/:id', name: 'stage', component: () => import('../views/StageDetail.vue') },
    { path: '/video/:id', name: 'video', component: () => import('../views/VideoLearn.vue') },
    { path: '/shadow/:id', name: 'shadow', component: () => import('../views/ShadowPractice.vue') },
    { path: '/search', name: 'search', component: () => import('../views/WordSearch.vue') },
    { path: '/vocabulary', name: 'vocabulary', component: () => import('../views/Vocabulary.vue') },
    { path: '/stats', name: 'stats', component: () => import('../views/Stats.vue') },
    { path: '/auth', name: 'auth', component: () => import('../views/Auth.vue') },
    { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue') },
  ],
  scrollBehavior() { return { top: 0 } },
})

export default router
