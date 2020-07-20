<template>
  <div class="collapse-item">

    <div class="title" :class="contentShow ? '' : 'active'" @click="handleItemClick">
      <p>{{title}}{{contentShow}}</p>
      <Icon class="icon" :class="contentShow ? 'active' : ''" icon="zhankai"></Icon>
    </div>
    <div class="content" ref="content" :class="contentShow ? 'active' : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    title: String,
    name: [String, Number]
  },
  inject: ['Collapse'],
  created () {
    this.Collapse.statusList.push({id: this.id, status: false})
    if (Array.isArray(this.Collapse.value)) {
      this.Collapse.value.forEach(item => {
        if (this.name === item) {
          this.Collapse.statusList.forEach(item => {
            if (item.id === this.id) {
              item.status = true
            }
          })
        }
      })
    }

    if (this.name === this.Collapse.value) {
      this.Collapse.statusList.forEach(item => {
        if (item.id === this.id) {
          item.status = true
        }
      })
    }
  },
  data () {
    return {
      id: this.Collapse.baseId++,
      statusList: this.Collapse.statusList,
      contentHeight: 90
    }
  },
  computed: {
    contentShow () {
      return this.Collapse.statusList.filter(item => item.id === this.id)[0].status
    }
  },
  watch: {

  },
  methods: {
    handleItemClick () {
      this.Collapse.statusList.forEach(item => {
        if (item.id === this.id) {
          item.status = !item.status
        } else {
          if (this.Collapse.accordion) {
            item.status = false
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.collapse-item
  height 100%
  .title
    min-height 50px
    font-size 14px
    font-weight bold
    display flex
    align-items center
    justify-content space-between
    border-top 1px solid #ccc
    padding 0 10px
    .icon
      transition transform .2s
      &.active
        transform rotateZ(90deg)
  .content
    // max-height 0
    height 0
    // transform scaleY(0)
    // display none
    overflow hidden
    transition height .3s ease-in
    // animation close .3s
    &.active
      // max-height 1000px
      height 90px
      // transition max-height .3s ease-out
      // transform scaleY(1)

</style>
