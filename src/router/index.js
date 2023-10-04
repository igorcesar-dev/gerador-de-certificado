import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GeradorManualView from '../views/GeradorManualView.vue'
import GeradorAutoView from '../views/GeradorAutoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/geradorManual',
    name: 'geradorManuak',
    component: GeradorManualView
  },
  {
    path: '/geradorAuto',
    name: 'geradorAuto',
    component: GeradorAutoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
