import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatView from '../views/StatView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: import.meta.env.BASE_URL + 'home',
      redirect: import.meta.env.BASE_URL
    },
    {
      path: import.meta.env.BASE_URL + 'stats',
      name: 'stats',
      component: StatView
    },
    {
      path: import.meta.env.BASE_URL + 'about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
