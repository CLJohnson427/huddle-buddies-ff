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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  // {
  //   path: '/matchups',
  //   name: 'Matchups',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Matchups.vue')
  // }
  {
    path: '/charts',
    name: 'Charts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Charts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === "production" ? '/huddle-buddies-ff/' : '/',),
  routes
})

export default router