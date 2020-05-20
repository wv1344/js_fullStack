<template>
  <div id="app">
    <el-button type="primary" size="mini" @childClick="doButton" disabled>主要按钮</el-button>

    <el-button type="success" size="small"
    v-on:childClick="doButton">主要按钮</el-button>
    
    <el-button type="info" size="large">主要按钮</el-button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import ElButton from './components/ElButton'
export default {
  name: 'App',
  components: {
    HelloWorld,
    'el-button':ElButton,
  },
  methods: {
    doButton(event){
      console.log(event)
    }
  }
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
</style>
