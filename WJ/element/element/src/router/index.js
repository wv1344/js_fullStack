import Vue from 'vue'
import Router from 'vue-router'
// import Calendar from '@/components/calendar'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/calendar',
      name: '日历',
      component: () => import('@/components/calendar.vue')
    }
  ]
})
