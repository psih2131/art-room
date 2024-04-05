import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/:id', component: HomeView },

  // {
  //   path: '/404', 
  //   name: 'NotFound',
  //   component: NotFound
  // },
  // {
  //   path: '/:pathMatch(.*)*', 
  //   redirect: '/404' 
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
