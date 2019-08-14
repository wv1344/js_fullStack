// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globalComponents from './common/js/components.js'
import axios from './common/js/axios.js'
import './common/styles/reset.styl'
import VueLazyload from 'vue-lazyload'


Vue.use(globalComponents)
Vue.use(axios)

Vue.config.productionTip = false

 
Vue.use(VueLazyload)
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('./common/images/loading.png'),
  attempt: 1
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
