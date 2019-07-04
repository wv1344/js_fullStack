<template>
  <div class="hello">
    <i-menu></i-menu>
    <i-button size="default" @click.native="handleClick">按钮</i-button>
  </div>
</template>

<script>
import Button from '@/components/com/button';
import Menu from '@/components/com/menu';
export default {
  name: 'HelloWorld',
  provide:{
    for:'demo'
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      obj:{
        name:'woniu'
      }
    }
  },
  components:{
    'i-button':Button,
    'i-menu':Menu
  },
  methods: {
    handleClick (){
      // console.log(this.msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
