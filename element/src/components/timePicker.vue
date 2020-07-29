<template>
  <span ref="timePicker" class="time-picker-container">
    <Popover>
      <template v-if="false" class="select-container">
        <div class="select">
          <div class="line1">
            <span class="line1-item" v-for="(item, index) in line1List" :key="index"></span>
          </div>
          <div class="line2">
            <span class="line1-item" v-for="(item, index) in line2List" :key="index"></span>
          </div>
          <div class="line3">
            <span class="line1-item" v-for="(item, index) in line3List" :key="index"></span>
          </div>
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
      <span slot="reference">
        <span>
          <i></i>
        </span>
        <input class="input-source" type="text" v-model="selectTime" />
      </span>
    </Popover>
  </span>
</template>

<script>
import Popover from './popover'
export default {
  name: 'TimePicker',
  components: {
    Popover
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
      line1List: [],
      line2List: [],
      line3List: []
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
    console.log(this.selectList)
  },
  computed: {},
  mounted () {
    window.onscroll = () => {
      // console.log(this.$refs.timePicker.getBoundingClientRect().top)
    }
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
  position: relative;

  .input-source {
    font-size: 16px;
    height: 36px;
    line-height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 30px 0 15px;
    outline: none;
  }

  .single-select {
    position: absolute;
    top: 10px;
    border: 1px solid #eee;
    padding: 5px;

    .time-item {
      border-bottom: 1px solid #eeeeee;
      color: #606266;
      line-height: 20px;
      font-size: 14px;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
<style lang="stylus">
.select-container {
  max-height: 200px;
  overflow: scroll;

  .time-select-item {
    line-height: 20px;
    font-size: 14px;
    padding: 8px 10px;
    color: #606266;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    &.selected {
      color: #409eff;
    }
  }
}
</style>
