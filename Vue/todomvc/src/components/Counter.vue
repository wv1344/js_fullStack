<template>
  <div>
    <h1>Clicked: {{count}} times </h1><br>
    <button @click="increment">ADD</button>
  </div>
</template>

<script>
// 让store里的改变状态的方法 mapActions
import {mapActions,mapMutations} from 'vuex'
export default {
  // props:['count'],
  // 自身的状态
  data () {
    return {
      // count:this.$store.state.count
    }
  },
  methods:{
    ...mapActions(['increment']),
    ...mapMutations(['increment'])
  },
  computed: {
    count(){
      return this.$store.state.count;
    }
  },
}
</script>

<style>

</style>
