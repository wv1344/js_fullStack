<template>
    <div class="menu">
      {{message}}
      {{demo}}
      <!-- {{for}} -->
    </div>
</template>

<script>
import Bus from '@/bus/bus'
export default {
  inject:['app'],
  data(){
    return {
      message:'woniu',
      demo:this.app.user
    }
  },
  created () {
    let self = this
    Bus.$on('todo',(val) => {
      console.log(val)
      self.message = val
    })
  }
}
</script>

<style>

</style>
