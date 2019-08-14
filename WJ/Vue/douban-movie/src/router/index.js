import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend'
import Movie from '@/views/movie'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path:'/movie/:id',
      name:'Movie',
      component:Movie
    }
  ]
})
