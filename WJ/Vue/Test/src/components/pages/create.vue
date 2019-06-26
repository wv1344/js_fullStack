<template>
  <div class="create">
    <div class="box2">
        <span class="title">任务追踪</span>
        <router-link to="/tcreate" class="create">创建一个任务</router-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.box2
  // width 100% 
  height 160px
  // margin-left 30px
  background #EDEDED
  padding 50px
  .title
    display block
    font-size 40px
    font-weight 500
    margin-bottom 20px
  .create
    color #4776B4
    text-decoration none
    font-size 21px
    font-weight bold
</style>
