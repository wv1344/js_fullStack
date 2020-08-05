<template>
  <div ref="timePicker" class="time-picker-container">
    <Popover :hasPadding="false">
      <template v-if="true" class="select-container">
        <div class="select">
          <ul class="line line1">
            <li class="line1-item" v-for="(item, index) in line1List" :key="index">{{item}}</li>
          </ul>
          <ul class="line line2">
            <li class="line1-item" v-for="(item, index) in line2List" :key="index">{{item}}</li>
          </ul>
          <ul class="line line3">
            <li class="line1-item" v-for="(item, index) in line3List" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="control">
          <span>取消</span>
          <span>确定</span>
        </div>
      </template>
      <template v-else>
        <div class="select-container">
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
      line1List: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      line2List: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      line3List: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    }
  },
  created () {
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
    // console.log(this.selectList)
  },
  computed: {},
  mounted () {

  },
  methods: {
    zero (val) {
      return val < 10 ? '0' + val : val
    },
    handleItemClick (item) {
      console.log(item)
    },
    handleClick (item) {
      this.selectTime = item
      this.$emit('input', item)
      console.log(item)
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
    height 260px
    list-style none
    overflow scroll
    padding 0
    &::-webkit-scrollbar
      width: 0 !important
    .line1-item, line2-item, line3-item
      height 30px
      text-align center
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
  border-top 1px solid #000
</style>
