import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path:"/eat",
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Eat.vue')
  // },
  // {
  //   path:"/drinks",
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Drinks.vue')
  // },
  // {
  //   path:"/basket",
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Basket.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
