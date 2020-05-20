const state = {
  items:[]
}

const getters = {

}

const mutations = {
  pushProductToCart(state,{id}){
    state.items.push({
      id,
      quantity:1
    })
  },
  incrementItemQuantity(state,{id}){
    const cartItem = state.items.find( item => item.id === id)
    cartItem.quantity++
  }
}

const actions = {
  addProductToCart({state,commit},product){
    if(product.inventory > 0){
      // - 把商品参加进 invertory 要什么逻辑
      // - 检查 items里面有没有 如果有 +1 如果没有 push()
      const curItem = state.items.find(item => item.id === product.id)
      if(!curItem){
        commit('pushProductToCart',{id:product.id})
      }else{
        commit('incrementItemQuantity',curItem)
      }
    }
  }
}

export default {
  namespaced: true,
  state, 
  getters, 
  actions,
  mutations
}