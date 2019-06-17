import Vue from 'vue'
import VueRouter from 'vue-router'

import {login} from 'pages/index';

// this.$router this.$route
Vue.use(VueRouter);

const routes = [
  {
     path:'/',
    name:'登录',
    hiddle:false,
    component:login
  }
];

export default new VueRouter({
  routes,
  // strict:ProcessingInstruction.env.NODE_ENV !== 'production'

})