<template>
  <div id="app">
    <img src="./assets/logo.png">
  <br>
  <div>
    <button @click="goBack">后退</button>
    <button @click="gogo">前进</button>
    <button @click="gohome">返回首页</button>
  </div>
    <router-link to="/">home</router-link> |
    <router-link to="/params/111/jspang is very good">params</router-link> |
    <router-link to="/goHome">gohome</router-link> |
    <router-link to="/goParams/33/nihao">goParams</router-link> |
    <router-link to="/hi1">Hi1</router-link> |
    <router-link to="/jspang">jspang</router-link> |

    <transition name="fade" mode="out-in">
    <router-view></router-view>
    </transition>

    <router-view name="left" style="float:left;width:50%;height:300px;background-color:#ccc;"></router-view>
    <router-view name="right" style="float:left;width:50%;height:300px;background-color:pink;"></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    gogo(){
      this.$router.go(1);
    },
    gohome(){
      this.$router.push('/')
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  transition: opacity .5s;
}
</style>
