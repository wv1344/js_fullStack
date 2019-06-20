// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Loading,Toast} from '@/common/plugin'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store/store'

import def_lazy_img from '../static/img/loading.gif'


Vue.config.productionTip = false

// Vue.prototype.$toast = 
Vue.use(Toast)
Vue.use(Loading)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: def_lazy_img,
})

fastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
