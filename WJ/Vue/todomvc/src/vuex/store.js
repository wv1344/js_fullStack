import Vue from 'vue';
import Vuex from  'vuex'

// 应用状态管理
Vue.use(Vuex);

// 全局共享
const state = {
  count:0
}

// 只有actions才可以触发mutaions改变，
// 只有mutaions 才可以修改state

const actions={
  increment:({commit}) => commit('increment')
}

const mutations={
  increment(state){
    state.count++
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})