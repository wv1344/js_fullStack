<template>
  <div id="app">
    <counter />
    <hr>
    <counter-brother></counter-brother>
  </div>
</template>

<script>
// 两个组件共享数据
// count不应该在counter
import Counter from "./components/Counter";
import CounterBrother from "./components/CounterBrother"
export default {
  // data(){
  //   return {
  //     count:0
  //   }
  // },
  // methods: {
  //   increment(){
  //     this.count++
  //   }
  // },
  components: {
    'counter': Counter,
    'counter-brother':CounterBrother
  }
};
</script>

<style>
</style>
