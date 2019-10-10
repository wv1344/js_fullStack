<template>
  <div class="calendar">
    <div class="header">
      <div class="title">{{ thisYearMonth }}</div>
      <div class="control">
        <button class="button bdrs-left" @click="handleLastMonth()">上个月</button>
        <button class="button" @click="handleToday()">今天</button>
        <button class="button bdrs-right" @click="handleNextMonth()">下个月</button>
      </div>
    </div>
    <div class="body">
      <div class="week">
        <div class="item" v-for="(item, index) in weeks" :key="index">{{item}}</div>
      </div>
      <div class="date">
        <div class="before-empty grid" v-for="(item,index) in beforeEmptyDay" :key="index+'before'" @click="handleBeforeClick(item)">
          <div class="wrap"><slot :data="item"><div>{{item.day}}</div></slot></div>
        </div>
        <div class="this-month-days grid" :class="selectFormat === year+'-'+item.monthFormat+'-'+item.dateFormat ? 'selected' : '' " @click="handleClick(item)"  v-for="(item,index_mo) in thisMonthDays" :key="index_mo">
          <div class="wrap" :class="format === year+'-'+item.monthFormat+'-'+item.dateFormat ? 'today' : '' "><slot :data="item"><div>{{item.day}}</div></slot></div>
        </div>
        <div class="after-empty grid" v-for="(item,index) in afterEmptyDay" :key="index+'after'" @click="handleAfterClick(item)">
          <div class="wrap">{{item.day}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    value: [Date, String, Number],
    range: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      year: new Date().getUTCFullYear(),
      month: new Date().getUTCMonth() + 1,
      date: new Date().getUTCDate(),
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      thisMonthDays: [],
      beforeEmptyDay: [],
      afterEmptyDay: [],
      emptyDay: undefined,
      format: null,
      selectFormat: null
    }
  },
  computed: {
    thisYearMonth () {
      return this.year + '年' + this.month + '月'
    }
  },
  methods: {
    // 个位数前面加 0
    zero (i) {
      return i >= 10 ? i : '0' + i
    },
    // 获取当前月的天数
    getThisMonthDays (ye, mon) {
      return new Date(ye, mon, 0).getDate()
    },
    // 创建本月日期
    createDays (year, month) {
      this.thisMonthDays = []
      let days = this.getThisMonthDays(year, month)
      for (let i = 1; i <= days; i++) {
        this.thisMonthDays.push({
          day: i,
          month: this.zero(month),
          dateFormat: this.zero(i),
          monthFormat: this.zero(month)
        })
      }
    },
    // 创建上个月和下个月日期格子
    emptyDays (year, month) {
      this.beforeEmptyDay = []
      this.afterEmptyDay = []
      let week = new Date(Date.UTC(year, month - 1, 1)).getDay()
      if (week <= 0) {
        this.emptyDay = week + 6
      } else {
        this.emptyDay = (week === 1 ? 7 : week - 1)
      }
      // 上个月有几个格子
      let preMonthDays = month - 1 < 0 ? this.getThisMonthDays(year - 1, 12) : this.getThisMonthDays(year, month - 1)
      for (let i = 1; i <= this.emptyDay; i++) {
        this.beforeEmptyDay.push({
          day: preMonthDays - (this.emptyDay - i),
          month: this.zero(month)
        })
      }
      // 下个月有几个格子
      let after = (42 - this.getThisMonthDays(year, month) - this.emptyDay)
      for (let i = 1; i <= after; i++) {
        this.afterEmptyDay.push({
          day: i,
          month: this.zero(month)
        })
      }
    },
    // 今天
    today () {
      this.year = new Date().getUTCFullYear()
      this.month = new Date().getUTCMonth() + 1
      this.date = new Date().getUTCDate()
      this.display(this.year, this.month, this.date)
      this.format = this.year + '-' + this.zero(this.month) + '-' + this.zero(this.date)
      this.selectFormat = this.year + '-' + this.zero(this.month) + '-' + this.zero(this.date)
    },
    // 渲染日历
    display (year, month, date) {
      this.emptyDays(year, month)
      this.createDays(year, month)
    },
    handleClick (e) {
      // e.selected = 'selected'
      this.selectFormat = this.year + '-' + e.monthFormat + '-' + e.dateFormat
    },
    handleBeforeClick (e) {
      let month = this.month === 1 ? 12 : this.month - 1
      this.month = month
      let year = this.month === 1 ? this.year - 1 : this.year
      this.year = year
      this.selectFormat = year + '-' + this.zero(month) + '-' + this.zero(e)
      this.display(year, month, 0)
    },
    handleAfterClick (e) {
      let month = this.month === 1 ? 12 : this.month - 1
      this.month = month
      let year = this.month === 1 ? this.year - 1 : this.year
      this.year = year
      this.selectFormat = year + '-' + this.zero(month) + '-' + this.zero(e)
      this.display(year, month, 0)
    },
    handleToday () {
      this.today()
    },
    handleLastMonth () {
      let month = this.month === 1 ? 12 : this.month - 1
      this.month = month
      let year = this.month === 1 ? this.year - 1 : this.year
      this.year = year
      this.selectFormat = year + '-' + this.zero(month) + '-01'
      this.display(year, month, 0)
    },
    handleNextMonth () {
      let month = this.month === 12 ? 1 : this.month + 1
      this.month = month
      let year = this.month === 12 ? this.year + 1 : this.year
      this.year = year
      this.selectFormat = year + '-' + this.zero(month) + '-01'
      this.display(year, month, 0)
    }
  },
  created () {
    if (this.value) {
      if (Object.prototype.toString.call(this.value) === '[object Date]') {
        this.year = this.value.getUTCFullYear()
        this.month = this.value.getMonth() + 1
        this.date = this.value.getDate()
        this.selectFormat = this.year + '-' + this.zero(this.month) + '-' + this.zero(this.date)
        this.display(this.year, this.month, this.date)
      } else if (Object.prototype.toString.call(this.value) === '[object String]') {
        console.log(this.value.split('/'))
      }
    } else {
      this.today()
    }
    if (this.range) {
      if (new Date(this.range[0]).getDay() === 1 && new Date(this.range[1]).getDay() === 0 && new Date(this.range[1]).getMonth() - new Date(this.range[0]).getMonth() <= 1) {
        // console.log(new Date(this.range[0]).getDay())

      }
    }
  },
  watch: {
    selectFormat (newVal, oldVal) {
      this.$emit('input', new Date(newVal))
    }
  }
}

</script>
<style lang='stylus' scoped>
.header
  padding 12px 20px
  display flex
  align-items center
  justify-content space-between
  border-bottom 1px solid #dcdfe6
  .title
    display inline-block
  .control
    font-size 0
    display inline-block
    float right
  button:focus
    outline 0!important
    background-color #f2f8fe
    color #1989f1
  button:hover
    background-color #f2f8fe
    color #1989f1
  .button
    background #fff
    font-size 12px
    border 1px solid #dcdfe6
    padding 7px 15px
  .bdrs-left
    border-radius 4px 0 0 4px
  .bdrs-right
    border-radius 0 4px 4px 0
.body
  padding 12px 20px 35px
  .week
    padding 12px 0
    .item
      display inline-block
      width 14.28571428571429%
      text-align center
  .date
    font-size 0
    font-weight 400
    border-left 1px solid #ebeef5
    border-top 1px solid #ebeef5
    .today
      color #1989f1
    .selected
      background-color #f2f8fe
      color #1989f1
    .before-empty,.after-empty
      color #c0c4cc
    .grid
      display inline-block
      width: 14.28571428571429%;
      .wrap
        box-sizing border-box
        height 85px
        line-height 20px
        border-right  1px solid #ebeef5
        border-bottom  1px solid #ebeef5
        font-size 16px
        padding 8px
        list-style 20px
</style>
