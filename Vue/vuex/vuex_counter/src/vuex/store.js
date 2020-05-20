import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// CEO
const state ={
  count:0
}
// 改变
const mutations = {
  increment(state){
    state.count++
  },
  decrement(state){
    state.count--
  }
}

const getters = {
  evenOrOdd: (state) =>{ 
    return state.count % 2 === 0 ? 'odd' : 'even'
  }
}

// 动作 部门 不能修改 state
const actions = {
  increment({commit}){
    commit('increment')
  },
  decrement({commit}){
    commit('decrement')
  },
  // 不能修改state
  incrementifOdd({commit,state}){
    if((state.count+1)%2 === 0){
      commit('increment')
    }
  },
  incrementAsync({commit}){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        commit('increment');
        resolve();
      },2000)
    })
    // actions axios 异步取数据
    // setTimeout(() => {
    //   commit('increment')
    // }, 2000);
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})