import { RouteRecordRaw, createRouter, createWebHashHistory, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/HelloWorld.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router