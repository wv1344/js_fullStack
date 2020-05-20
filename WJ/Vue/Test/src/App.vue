<template>
  <div id="app">

    <el-table>
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column label="人员信息">
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
    </el-table-column>
    <el-table-column label="应发工资">
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
    </el-table-column>
    <el-table-column label="应扣款项">
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
    </el-table-column>
    <el-table-column label="实发金额"></el-table-column>
    <el-table-column label="备注"></el-table-column>
    </el-table>
    <!-- <div class="header">
      <div class="logo">
        <router-link to="/" class="logo-l">计划板</router-link>
      </div>
      <div class="home">
        <router-link to="/" class="home-l">首页</router-link>
      </div>
      <div class="plan">
        <router-link to="/plan" class="plan-l">计划列表</router-link>
      </div>
    </div>
    <div class="con">
      <div class="left">
        <div class="box">
          <span class="up">已有时长</span>
          <span class="down">0小时</span>
        </div>
      </div>
      <div class="right">
        <router-view></router-view>
    </div>
  </div> -->
  <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" scoped>
#app
  .header
    height 50px
    width 100%
    background #F8F8F8
    font-size 16px
    padding-left 250px
    .logo
      display inline-block
      font-size 18px
      line-height 50px
      .logo-l
        text-decoration none
        color #949494
    .home
      display inline-block
      padding-left 20px
      .home-l
        text-decoration none
        color #767676
    .plan
      display inline-block
      padding-left 20px
      .plan-l
        text-decoration none
        color #767676
  .con
    display flex
    width 100%
    padding-left 100px
    padding-top 20px
    .left
      flex 1
      .box
        width 80%
        font-size 30px
        text-align center
        border 1px solid #DCDCDC
        border-radius 4px
        .up
          display block 
          background #F5F5F5
          height 90px
          line-height 90px
        .down
          display block
          height 90px
          line-height 90px
    .right
      flex 3
</style>
