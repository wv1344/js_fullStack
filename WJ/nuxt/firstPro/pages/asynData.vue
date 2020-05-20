<template>
  <div>
    <ul>
      <li>{{info.name}}</li>
      <li>{{info.age}}</li>
      <li>{{info.interset}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      name:'heoja'
    }
  },
  async asyncData(){
    // return axios.get('https://api.myjson.com/bins/qi1ek').then(res =>{
    //   return {
    //     info:res.data
    //   }
    // })
    let { data } = await axios.get('https://api.myjson.com/bins/qi1ek')
    return {info : data}
  }
}

</script>
<style lang='' scoped>

</style>