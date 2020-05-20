<template>
  <div class="star" ref="star">
    <!-- <p v-show="false">{{sc}}|{{sendscore}}</p> -->
    <!-- <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt=""> -->
    <span class="star-bg"  v-for="(item, index) in stars" :key="index" :class="item"></span>
  </div>
</template>

<script>
import on from './star24_on@2x.png'
import off1 from './star24_off@2x.png'
import half from './star24_half@2x.png'

export default {
  props: [
    'sendscore',
    'size'
  ],
  data(){
    return {
      // sc:this.sendscore
    }
  },

  computed: {
    stars () {
      // let num = String(this.sendscore);
      // let s = parseInt(num);
      // let a =num.split(".");
      // let x = a[1];
      let on = parseInt(this.sendscore-1);
      let half = String(this.sendscore).split(".")[1];
      let arr = []
      for (let i = 0; i <= on; i++) {
        arr.push('on')
      }
      if(half >= 5){
        arr.push('half');
      }
      while(arr.length<5){
        arr.push('off')
      }
      console.log(arr)
      return arr;
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.star
  .star-bg
      display inline-block
      width 16px
      height 16px
      background-size contain
      &.on
        bg-image(star24_on)
      &.half
        bg-image(star24_half)
      &.off
        bg-image(star24_off)
    // .img
    //   width 16px
    //   height 16px
    //   vertical-align middle

</style>
