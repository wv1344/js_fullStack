<template>
  <button :class="'i-button-size' + size" :disable="disable" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  function oneOf(value,validList){
    for(let i = 0;i<validList.length;i++){
      if(value === validList[i]){
        return true
      }
    }
    return false
  }
import Bus from '@/bus/bus'

  export default{
    props:{
      size:{
        validator(value) {
          return oneOf(value,['small','large','default'])
        },
        default:'default'
      },
      disable:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        msg:'老师的会计分录'
      }
    },
    methods: {
      handleClick (){
        // console.log(this.msg)
        // this.$emit('on-click',this.msg)
        Bus.$emit('todo',this.msg)
      }
    },
  }
</script>

<style scoped>
button{
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}
.i-button-sizelarge{
  padding: 12px;
}
.i-button-sizedefault{
  padding: 8px;
}
.i-button-sizesmall{
  padding: 4px;
}
</style>
