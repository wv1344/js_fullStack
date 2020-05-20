<template>
  <button class="el-button" 
  :disabled="buttonDisable"
  :class="[type ? 'el-button--'+type:'',
  size ? 'el-button--'+size:'',
  {
    'is-disabled':buttonDisable
  }
  ]"
  @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name:'ElButton',
  props:{
    type:{
      string:String,
      default:'default'
    },
    size:{
      string:String,
      default:'normal'
    },
    disabled:Boolean
  },
  methods: {
    handleClick(e){
      this.$emit('childClick',e)
    }
  },
  computed: {
    buttonDisable(){
      return this.disabled
    }
  }
}
</script>

<style>

</style>
