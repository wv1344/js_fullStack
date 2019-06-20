<template>
  <div class="star" ref="star">
    <p v-show="false">{{sc}}|{{sendscore}}</p>
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
    <img class="img" :src="off1" alt="">
  </div>
</template>

<script>
import on from './star24_on@2x.png'
import off1 from './star24_off@2x.png'
import half from './star24_half@2x.png'

export default {
  props: [
    'sendscore'
  ],
  data(){
    return {
      sc:this.sendscore
    }
  },
  updated() {
    console.log( this.$refs.star)
    this.$refs.star.querySelectorAll('.img').forEach( ii => ii.src = off1)

    let num = String(this.sendscore);
    let s = parseInt(num);
    let a =num.split(".");
    let x = a[1];
    console.log(x);
    for(let i = 0;i<s;i++){
      this.$refs.star.querySelectorAll('.img')[i].src = on;
    }
    if(x>=5){
      this.$refs.star.querySelectorAll('.img')[s].src = half;
    }
  },
}
</script>

<style lang="stylus" scoped>
.star
  .img
    width 16px
    height 16px
    vertical-align middle

</style>
