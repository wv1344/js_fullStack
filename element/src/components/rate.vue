<template>
<div class="rate-container">
   <span
      v-for="(item,index) in startList"
      :key="index"
      @mousemove="handleMouseOver(index)"
      @mouseout="handleMouseOut(index)"
      @click="handleClick(index)">
      <Icon class="icon-color" :icon="item.icon" ></Icon>
  </span>
</div>

</template>

<script>
export default {
  name: 'Rate',
  props: {
    value: [Number, String]
  },
  data () {
    return {
      score: this.value,
      emptyList: [
        {icon: 'emptystar'},
        {icon: 'emptystar'},
        {icon: 'emptystar'},
        {icon: 'emptystar'},
        {icon: 'emptystar'}
      ],
      startList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.startList = this.emptyList
      this.show(this.score)
    },
    handleClick (e) {
      this.score = e + 1
      this.show(this.score)
      this.$emit('input', this.score)
    },
    handleMouseOver (e) {
      this.show(e + 1)
    },
    handleMouseOut () {
      this.show(this.score)
    },
    show (val) {
      this.startList = JSON.parse(JSON.stringify(this.emptyList))
      for (let i = 0; i < val; i++) {
        this.startList[i].icon = 'star1'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.rate-container
  margin 20px 20px
  .icon-color
    color rgb(247, 186, 42)
    font-size 24px
    transition transform .1s ease-in-out
    &:hover
      transform scale(1.2,1.2)
</style>
