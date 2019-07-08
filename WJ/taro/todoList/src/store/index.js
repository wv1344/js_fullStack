import {createStore,applyMiddleware} from 'redex'

export default function configStore(){
  // createStore 返回实例 单一状态树
  // vuex 四部分
  const store = createStore(rootReducer)
  return store
}