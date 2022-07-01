import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/pages/Home.vue') },
  { path: '/about', name: 'About', component: () => import('@/pages/About.vue') },
  { path: '/charts', name: 'Charts', component: () => import('@/pages/Charts.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/Home.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === "production" ? '/huddle-buddies-ff/' : '/',),
  routes
})

export default router