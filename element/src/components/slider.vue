<template>
  <div class="slider-container" @click="handleClick">
    <div ref="left" class="left"></div>
    <div class="circle"
      :class="draging ? 'draging': ''"
      ref="circle"
      @mousedown="handeleMouseDown">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    value: [Number, String]
  },
  data () {
    return {
      length: undefined,
      flag: false,
      sliderWidth: 0,
      isDrag: false,
      startX: undefined,
      moveX: 0,
      beforeVal: 0,
      nowVal: 0,
      draging: false
    }
  },
  mounted () {
    this.nowVal = this.value

    this.$nextTick(() => {
      this.sliderWidth = document.querySelector('.slider-container').scrollWidth
      this.$refs.left.style.width = `${this.value}%`
      this.$refs.circle.style.left = `${this.value}%`
    })
    window.onresize = () => {
      this.sliderWidth = document.querySelector('.slider-container').scrollWidth
    }
    document.onmousedown = (event) => {
      this.isDrag = false
    }
  },
  computed: {
    sliderOffsetLeft () {
      return document.querySelector('.slider-container').offsetLeft
    }
  },
  watch: {
    value (newVal) {
      this.nowVal = newVal

      console.log('Watch')
      this.$refs.left.style.width = `${newVal}%`
      this.$refs.circle.style.left = `${newVal}%`
    }
  },
  methods: {
    handleClick (e) {
      if (this.isDrag) return false
      console.log('Click')
      let moveWidth = e.clientX - this.sliderOffsetLeft
      this.nowVal = (moveWidth / this.sliderWidth) * 100
      this.beforeVal = this.nowVal

      this.setChange(this.nowVal)
    },
    handeleMouseDown (e) {
      this.flag = true
      this.startX = e.clientX
      this.beforeVal = this.nowVal
      this.draging = true
      console.log('Down')
      console.log(this.nowVal)
      document.onmousemove = (event) => {
        if (!this.flag) return false
        this.isDrag = true
        this.moveX = event.clientX - this.startX

        this.nowVal = this.beforeVal + (this.moveX / this.sliderWidth) * 100

        if (this.nowVal > 100) this.nowVal = 100
        if (this.nowVal < 0) this.nowVal = 0
        this.setChange(this.nowVal)
      }
      document.onmouseup = (event) => {
        if (!this.flag) return false
        this.beforeVal = ((event.clientX - this.startX) / this.sliderWidth * 100) + this.beforeVal
        this.startX = event.clientX
        this.flag = false
        this.draging = false
      }
    },
    setChange (val) {
      this.$refs.left.style.width = `${val}%`
      this.$refs.circle.style.left = `${val}%`
      this.$emit('input', parseInt(val))
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider-container
  margin 20px 0
  height 8px
  border-radius 5px
  background #e4e7ed
  width 100%
  cursor pointer
  position relative
  .left
    height 8px
    border-radius 5px
    background  #1e90ff
    position absolute
  .circle
    position absolute
    height 20px
    width 20px
    top 50%
    transform translateY(-50%)
    border-radius 50%
    background radial-gradient(white 50%, #1e90ff 15%);
    cursor grab
    &.draging
      cursor grabbing !important
</style>
