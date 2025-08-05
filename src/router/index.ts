import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // { path: '/', name: 'Home', component: HomePage },
  { path: '/', name: 'Home', component: () => import('@/pages/HomePage.vue') },
  // { path: '/about', name: 'About', component: () => import('@/pages/AboutPage.vue') },
  // { path: '/charts', name: 'Charts', component: () => import('@/pages/ChartsPage.vue') },
  // { path: '/github', name: 'Github', redirect: {}, beforeEnter() { location.href = 'https://github.com/CLJohnson427/huddle-buddies-ff' } },
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/HomePage.vue') }
]

const router = createRouter({
  // history: createWebHistory(process.env.NODE_ENV === 'production' ? '/huddle-buddies-ff/' : '/',),
  // history: createWebHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
