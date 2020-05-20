<template>
  <div class="tcreate">
    <h1>创建</h1>
    <div class="block">
      <span class="demonstration">日期</span>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <span class="demonstration">时间</span>
      <el-time-select
        v-model="time"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00'
        }"
        placeholder="选择时间">
      </el-time-select>
    </div>
    <div class="beizhu">
      <span class="demonstration">备注</span>
      <el-input class="input" v-model="comment" placeholder="Comment"></el-input>
    </div>
    <div class="btn">
      <el-button type="primary" @click="commit">保存</el-button>
      <el-button type="danger">取消</el-button>
    </div>
    <div class="lists">
      <div class="list" v-if="list.length">
        <v-list :list="list"></v-list>
      </div>
      <div style="padding-top:20px;font-weight:bold;" v-else>
        还没有任何计划
      </div>
    </div>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import vList from '@/components/list'
export default {
  name:'Tcreate',
  data(){
    return {
      date:'',
      time:'',
      comment:''
    }
  },
  methods: {
    commit(){
      const plan = {
        date:this.date,
        time:this.time,
        comment:this.comment
      }
      console.log(plan)
      this.$store.dispatch('add',plan)
      this.$router.go(-1)
    },
  },
  computed: {
    ...mapGetters(['list'])
  },
  components: {
    'v-list':vList
  }
}
</script>

<style lang="stylus" scoped>
.tcreate
  margin-left 30px
  .block
    .demonstration
      margin-left 30px
  .beizhu
    margin-top 20px
    margin-left 30px
    .input
      margin-top 10px
  .btn
    margin-left 40px
    margin-top 20px
  .lists
    margin-top 20px
    padding-top 20px
    border-top 1px solid #000
</style>
