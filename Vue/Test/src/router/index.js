import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/pages/index'
import create from '@/components/pages/create'
import plan from '@/components/pages/plan'
import Tcreate from '@/components/pages/Tcreate'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'create',
      component: create,
    },
    {
      path:'/plan',
      name:'plan',
      component:plan
    },
    {
      path:'/tcreate',
      name:'tcreate',
      component:Tcreate
    }
  ]
})
