import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'datalist',
      component: () => import('../views/datalistView.vue'),
      children:[
        {
          path:'meowli',
          component:()=>import('../views/MeowLi.vue')
        }

      ],
    }
  ]
})

export default router
