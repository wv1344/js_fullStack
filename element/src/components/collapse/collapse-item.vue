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
              this.contentShow = true
            }
          })
        }
      })
    }

    if (this.name === this.Collapse.value) {
      this.Collapse.statusList.forEach(item => {
        if (item.id === this.id) {
          item.status = true
          this.contentShow = true
        }
      })
    }
  },
  data () {
    return {
      id: this.Collapse.baseId++,
      contentShow: false,
      statusList: this.Collapse.statusList,
      contentHeight: 90
    }
  },
  watch: {
    contentShow (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.content.style.height = `${this.$refs.content.scrollHeight}px`
        })
      } else {
        this.$nextTick(() => {
          this.$refs.content.style.height = '0px'
        })
      }
    }
  },
  methods: {
    handleItemClick () {
      this.Collapse.change(this._uid)
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
    height 0
    overflow hidden
    transition height .3s ease-in
    // transition max-height .5s cubic-bezier(0, 1, 0, 1)
    // transition-delay 0s
    // animation close .3s
    // &.active
      // max-height 1000px
      // height 90px
      // transition-delay 0s
      // transition max-height .5s ease-in-out
      // transform scaleY(1)

</style>
