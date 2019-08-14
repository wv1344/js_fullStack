import shop from '../../api/shop'

const state = {
  all:[]
}

const getters = {

}

const mutations = {
  setProducts (state,products){
    state.all = products
  }
}

const actions = {
  getAllProducts({commit}){
    // 前后都分离 action 调用api
    shop.getProducts(products => {
      commit('setProducts',products);
    })
    
  }
}



export default {
  namespaced: true,
  state, 
  getters, 
  actions,
  mutations
}