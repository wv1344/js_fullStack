<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
  </div>
</template>

<script>
import header from '@/components/header/header.vue'
export default {
  name: 'App',
  data(){
    return{
      seller:{
        // 从接口获取
      }
    }
  },
  components:{
    "v-header":header
  },
  created () {
    this.$http.get('https://www.easy-mock.com/mock/5d00b0810507eb134409028f/vue/vue-eleme-seller').then(res=>{
      console.log(res);
      if(res.data.errno === 0){
        this.seller = Object.assign({},this.seller,res.data.data)
      }
    })
  }
}
</script>

<style>

</style>
