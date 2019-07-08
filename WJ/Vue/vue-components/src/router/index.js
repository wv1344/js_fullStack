import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Dispaly from '@/view/display'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dispaly',
      component: Dispaly
    }
  ]
})
