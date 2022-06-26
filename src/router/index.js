import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  // {
  //   path: '/matchups',
  //   name: 'Matchups',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Matchups.vue')
  // }
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('../pages/Charts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === "production" ? '/huddle-buddies-ff/' : '/',),
  routes
})

export default router