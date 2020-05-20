<template>
  <div id="app">
     <h3>clicked {{$store.state.count}} times,count is {{evenOrOdd}}</h3>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementifOdd">imcrement if odd</button>
    <button @click="incrementAsync">imcrement Async</button>
  </div>
</template>

<script>
// 借
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    //  eventOrOdd
    }
  },
  // methods: {
  //   ...mapActions(['increment'])
  // }
  methods: mapActions(['increment','decrement','incrementifOdd','incrementAsync']),
  computed: mapGetters(['evenOrOdd']),
  // {
    // 如果有多处要用到奇偶判断怎么办
    // ...
    // eventOrOdd(){
    //   return this.$store.state.count % 2 === 0 ? 'odd' : 'even';
    // }
  // }
}
</script>

<style>
#app{
  text-align: center;
}
</style>
