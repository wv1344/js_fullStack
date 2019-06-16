<template>
  <div class="hello">
    <h3>{{$store.state.count}}</h3>
    <button @click="increment">ADD</button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions(['increment'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
