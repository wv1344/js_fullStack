<template>
  <div class="recommend" v-show="sendrecommend.length">
    <img src="./up.png" alt="">
    <span v-for="(item,index) in sendrecommend" :key="index">{{item}}</span>
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

</style>
