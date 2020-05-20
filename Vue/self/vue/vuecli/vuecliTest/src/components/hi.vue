<template>
  <div>
    <h2>{{msg}}-{{ $route.params.username}}-{{$route.params.id}}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
