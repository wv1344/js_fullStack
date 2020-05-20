import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  list:[]
}

const mutations = {
  addone(state,plan){
    state.list.push(plan)
  }
}

const getters = {
    list: state => state.list
  // list: (state) => {
  //   let newlist = []
  //   state.list.forEach((item) => {
  //     year = item.list.date.getYear()
  //     month = item.list.date.getMonth()
  //     day = item.list.date.getDate()
  //     datee = year + month + date
  //     let newdate = {
  //       date:datee,
  //       time:item.time,
  //       comment:item.comment
  //     }
  //     newlist.push(newdate);
  //   })
    
  //   return newlist;
  // }
}

const actions = {
  add({commit},plan){
    commit('addone',plan)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})