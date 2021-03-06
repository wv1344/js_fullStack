const { createStore } = require('redux')
/**
 * [
 * {tabName:'推荐',selected:true},
 * {tabName:'关注',selected:false}
 * ]
 */

function reducer(state = [],action){
  console.log(action)
  switch(action.type){
    case 'ADD_TABNAME':
      const { tabName,selected } = action;
      // 浅拷贝
      // state.push()
      return [...state,{tabName,selected}]
      default:
        return state;
    case 'TOGGLE_SELECT':
      const { index } = action;
      return state.map((tab,i) => {
        if(index === i){
          return {...tab,selected:true}
        }
        return {...tab,selected:false}
      })
  }
}

const store = createStore(reducer);
store.subscribe(() => {
  console.log('store',store.getState())
})
//  store.dispatch({type:'@@INIT'})

// 要改变数据的时候 就要设计 type 字段
// 在 reducer 里面做判断
store.dispatch({
  type:'ADD_TABNAME',
  tabName:'推荐',
  selected:false
})
store.dispatch({
  type:'ADD_TABNAME',
  tabName:'关注',
  selected:false
})
// 用户点了 第 0 项
store.dispatch({
  type:'TOGGLE_SELECT',
  index:1
})