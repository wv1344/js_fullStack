<template>
  <div id="app">
    <div class="calendar">
      <Calendar></Calendar>
    </div>
    <div class="input-box">
      <Input type="text" v-model="con" placeholder="请输入内容" clearable/>
    </div>
    <div>{{con}}</div>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
import Input from '@/components/input'
export default {
  name: 'App',
  components: {
    Calendar,
    Input
  },
  data () {
    return {
      value: new Date(),
      con: 'sldkfj'
    }
  }
}
</script>

<style lang="stylus">
@import '//at.alicdn.com/t/font_1503790_yp9803cj1bg.css'

.calendar
  height 300px
  width 400px
.input-box
  margin-top 10px
</style>
