<template>
  <div>
    <h2>New-content</h2>
  <p>newId : {{$route.params.id}}</p>
  <ul>
    <li><nuxt-link to="/">Home</nuxt-link></li>
  </ul>
  </div>
</template>
<script>
export default {
  validate({params}){
    return /^\d+$/.test(params.id);
  },
  data(){
    return{
      title:this.$route.params.title
    }
  },
  head(){
    return {
      title:this.title,
      meta:[
        {hid:'description',name:'news123',content:' this is a content page'}
      ]
    }
  }
}
</script>