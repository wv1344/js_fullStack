<template>
  <div class="list" >
    <div class="con" v-for="(item,index) in list" :key="index">
      <span class="date">{{item.date}}</span>
      <span class="time">{{item.time}}</span>
      <span class="comment">{{item.comment}}</span>
    </div>
    <button @click="test">test</button>
  </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    test(){
      var d = new Date(this.list.date);  
      console.log(d.getYear())  
    }
  },
}
</script>

<style>

</style>
