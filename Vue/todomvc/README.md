- el:#root 根挂载节点
- App component + vue-router + vuex 混合在一起的应用

new Vue({
  el:'#app',
  render:h => h(App)
})

- vue 的难点 数据管理
  组件的状态，data(){},
  两兄弟组件共享状态，
  props 传递过去
  应用状态？

- 当页面多个组件要共享状态时，
  将共享状态放置在这些组件共同的父组件data来管理
  状态要唯一，放在一个地方（共同的父组件） 方便管理
  如果不统一，状态有可能不同步
  父子组件通信 v-on:incerment="incrementCount"
  props:  this.$emit();

- 麻烦 找父节点有麻烦，this.$emit()
  很多状态要共享 很多组件 组件的关系也错综复杂，
  App 全局数据管理 vuex 应用状态管理