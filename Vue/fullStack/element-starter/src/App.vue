<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-button @click="startHacking">Start</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  },
  mounted() {
    // ?username=qqq&password=1234
    let url = '/api/user/login';
    // console.log('lksadfj')

    fetch(url
      // url,{
      //   method:'get', 
      //   mode:"cors",  
      //   headers:new Headers({
      //    'Content-Type': 'application/x-www-form-urlencoded', // 指定提交方式为表单提交
      //   })
      // }
      // .then(data => data.json())
    ).then(data => {
      console.log(data);
    })
  },
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
