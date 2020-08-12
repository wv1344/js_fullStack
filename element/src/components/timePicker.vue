<template>
  <div ref="timePicker" class="time-picker-container">
    <Popover :hasPadding="false" v-model="popoverShow">
      <!-- 滚动式 时间选择 -->
      <template v-if="selectableRange" class="select-container">
        <div class="select">
          <ul ref="hour" class="line line1">
            <li class="line1-item" v-for="(item, index) in line1List" :key="index" :ref="'line1-'+item" >{{item}}</li>
          </ul>
          <ul ref="minute" class="line line2">
            <li class="line1-item" v-for="(item, index) in line2List" :key="index" :ref="'line2-'+item">{{item}}</li>
          </ul>
          <ul ref="second" class="line line3">
            <li class="line1-item" v-for="(item, index) in line3List" :key="index" :ref="'line3-'+item">{{item}}</li>
          </ul>
          <div class="middle-line"></div>
        </div>
        <div class="control">
          <span>取消</span>
          <span class="confirm">确定</span>
        </div>
      </template>
      <!-- 固定时间间隔 列表时间选择 -->
      <template v-else>
        <div class="single-select-container">
          <div
            class="time-select-item"
            :class="selectTime === item? 'selected':''"
            v-for="(item, index) in selectList"
            :key="index"
            @click="handleClick(item)"
          >{{item}}</div>
        </div>
      </template>
      <div slot="reference" style="height: 100%; display: inline-block;">
        <Input class="input-source" type="text" placeholder="" v-model="selectTime"/>
      </div>
    </Popover>
  </div>
</template>

<script>
import Popover from './popover'
import Input from './input'
export default {
  name: 'TimePicker',
  components: {
    Popover,
    Input
  },
  props: {
    value: [String, Date],
    selectableRange: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default: () => {
        return {
          start: '08:30',
          step: '00:17',
          end: '18:30'
        }
      }
    }
  },
  data () {
    return {
      selectTime: '',
      selectList: [],
      popoverShow: false,
      line1List: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      line2List: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      line3List: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      list1OffsetTop: [],
      list2OffsetTop: [],
      list3OffsetTop: [],
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  created () {
    this.listTimeInit()
    this.scrollTimeInit()
  },
  watch: {
    popoverShow (newVal) {
      if (newVal) {
        this.list1OffsetTop = []
        this.list2OffsetTop = []
        this.list3OffsetTop = []
        this.$nextTick(() => {
          this.line1List.forEach((item, index) => {
            this.list1OffsetTop.push(this.$refs['line1-' + item][0].offsetTop)
          })
          this.line2List.forEach((item, index) => {
            this.list2OffsetTop.push(this.$refs['line2-' + item][0].offsetTop)
          })
          this.line3List.forEach((item, index) => {
            this.list3OffsetTop.push(this.$refs['line3-' + item][0].offsetTop)
          })
          this.$refs.hour.scrollTop = this.hour * 35
          this.$refs.minute.scrollTop = this.minute * 35
          this.$refs.second.scrollTop = this.second * 35
        })
      }
    }

  },
  computed: {

  },
  mounted () {
    let timeout
    this.$nextTick(() => {
      ['hour', 'minute', 'second'].forEach(item => {
        this.$refs[item].addEventListener('scroll', () => {
          clearTimeout(timeout)
          let top = this.$refs[item].scrollTop + 90
          let llist = item === 'hour' ? this.list1OffsetTop : item === 'minute' ? this.list2OffsetTop : this.list3OffsetTop
          llist.forEach((bar, index) => {
            if (top > bar) {
              if (item === 'hour') {
                this.hour = index
                this.$emit('input', this.zero(index) + ':' + this.zero(this.minute) + ':' + this.zero(this.second))
              } else if (item === 'minute') {
                this.minute = index
                this.$emit('input', this.zero(this.hour) + ':' + this.zero(index) + ':' + this.zero(this.second))
              } else {
                this.second = index
                this.$emit('input', this.zero(this.hour) + ':' + this.zero(this.minute) + ':' + this.zero(index))
              }
            }
          })
          timeout = setTimeout(() => {
            this.$refs[item].scrollTop = (item === 'hour' ? this.hour : item === 'minute' ? this.minute : this.second) * 35
          }, 400)
        })
      })
    })
  },
  methods: {
    listTimeInit () {
      let startTime = this.pickerOptions.start.split(':')
      let stepTime = this.pickerOptions.step.split(':')
      let endTime = this.pickerOptions.end.split(':')
      let hour = 0
      let minute = 0
      hour = parseInt(startTime[0])
      minute = parseInt(startTime[1])

      while (hour <= parseInt(endTime[0])) {
        if (hour === parseInt(endTime[0])) {
          if (minute <= parseInt(endTime[1])) {
            this.selectList.push(`${this.zero(hour)}:${this.zero(minute)}`)
            minute = minute + parseInt(stepTime[1])
          } else {
            break
          }
        }
        this.selectList.push(`${this.zero(hour)}:${this.zero(minute)}`)
        minute = minute + parseInt(stepTime[1])
        hour = hour + parseInt(stepTime[0])
        if (minute >= 60) {
          minute = minute - 60
          hour++
        }
      }
    },
    scrollTimeInit () {

    },
    zero (val) {
      return val < 10 ? '0' + val : val
    },

    handleItemClick (item) {
      console.log(item)
    },
    handleClick (item) {
      this.selectTime = item
      this.$emit('input', item)
      this.popoverShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.time-picker-container {
  display inline-block
}
</style>
<style lang="stylus">
.select
  display flex
  position relative
  width 100%
  .line
    position relative
    flex 1
    margin 0
    height 200px
    list-style none
    overflow scroll
    padding 0
    z-index 2
    &::-webkit-scrollbar
      width: 0 !important
    &:before
      content ''
      display block
      width 100%
      height 85px
      width 100%
      // height 35px
      // position absolute
      // content ''
      // top 50%
      // transform translateY(-50%)
      // border-top 1px solid #eee
      // border-bottom 1px solid #eee
    &:after
      content ''
      display block
      width 100%
      height 66px
    .line1-item, line2-item, line3-item
      height 35px
      line-height 35px
      text-align center
  .middle-line
    z-index 1
    position absolute
    top 50%
    height 35px
    width 100%
    margin 0 10px
    transform translateY(-50%)
    border-bottom 1px solid #eee
    border-top 1px solid #eee
.single-select-container
  height 200px
  overflow scroll
.time-select-item
  line-height: 20px;
  font-size: 14px;
  padding: 8px 10px;
  color: #606266;

  &:hover
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;

  &.selected
    color: #409eff;
.control
  height 35px
  padding-right 10px
  text-align right
  font-size 14px
  line-height 35px
  border-top 1px solid #eee
  span
    cursor pointer
  .confirm
    color #409eff
</style>
