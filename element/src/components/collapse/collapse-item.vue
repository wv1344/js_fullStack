<template>
  <div class="collapse-item">
    <div class="title" @click="handleItemClick">
      <p>{{title}}</p>
      <i class="iconfont zhankai"></i>
    </div>
    <div class="content" :class="contentShow ? 'active' : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    title: String
  },
  created () {
  },
  data () {
    return {
      contentShow: false
    }
  },
  methods: {
    handleItemClick () {
      this.contentShow = !this.contentShow
    }
  }
}
</script>

<style lang="stylus" scoped>
.collapse-item
  height 100%
  .title
    min-height 50px
    border-bottom 1px solid #ccc
    display flex
    align-items center
  .content
    height 0
    // display none
    overflow hidden
    transition height .3s
    // animation close .3s
    &.active
      height 90px
      border-bottom 1px solid #ccc

      // display block

</style>
