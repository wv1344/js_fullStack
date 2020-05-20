<template>
  <div>
    <div class="con" v-show="!sendrecommend.length"></div>
    <div class="recommend" v-show="sendrecommend.length">
      <img src="./up.png" alt="" width="15" height="15">
      <span v-for="(item,index) in sendrecommend" :key="index" class="item">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'sendrecommend'
  ],

}
</script>

<style lang="stylus" scoped>
.con
  width 100%
  height 5px
.recommend
  .item
    display inline-block
    border 1px solid #ECECEE
    padding 3px 5px
    margin-left 8px
    font-size 12px
    color #9D9EA2
    margin-bottom 5px
</style>
