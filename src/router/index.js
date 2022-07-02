import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/pages/HomePage.vue') },
  { path: '/about', name: 'About', component: () => import('@/pages/AboutPage.vue') },
  { path: '/charts', name: 'Charts', component: () => import('@/pages/ChartsPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/HomePage.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === "production" ? '/huddle-buddies-ff/' : '/',),
  routes
})

export default router