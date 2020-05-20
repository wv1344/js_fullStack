<template>
  <div>
    <ul></ul>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'singer',
  data () {
    return {

    }
  },
  methods:{
    _getList(){
      api._getList
    }
  },
  created(){
    this._getList()
  }
}

</script>
<style lang='stylus' scoped>

</style>