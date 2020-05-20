<template>
  <div class="plan">
    <div class="button">
      <router-link to="/tcreate"><el-button type="primary">创建</el-button></router-link>
    </div>
    <div class="list" v-if="list.length">
      <v-list :list="list"></v-list>
    </div>
    <div style="padding-top:20px;font-weight:bold;" v-else>还没有任何计划</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import vList from '../list'
export default {
  name:'plan',
  computed: {
    ...mapGetters(['list'])
  },
  components:{
    'v-list':vList
  }
}
</script>

<style lang="stylus" scoped>
.plan
  margin-left 30px
  .button
    border-bottom 1px solid #EDEDED
    padding-bottom 20px
</style>
