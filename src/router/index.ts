import { RouteRecordRaw, createRouter, createWebHashHistory, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/nav'
  },
  {
    path: '/nav',
    name: 'nav',
    component: () => import('@/views/nav/index.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router