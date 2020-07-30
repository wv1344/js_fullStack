<template>
  <div ref="timePicker" class="time-picker-container">
    <Popover :hasPadding="false">
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
    // console.log(this.selectList)
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
  display inline-block
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
