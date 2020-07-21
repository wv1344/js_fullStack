<template>
  <div class="collapse-container">
    {{statusList}}
    <slot ></slot>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
  props: {
    value: [Array, String],
    accordion: Boolean
  },
  provide () {
    return {
      Collapse: this
    }
  },
  data () {
    return {
      currentIndex: undefined,
      statusList: [],
      baseId: 0
    }
  },
  methods: {
    change (id) {
      this.$children.forEach(child => {
        if (child._uid === id) {
          child.contentShow = !child.contentShow
        } else {
          if (this.accordion) {
            child.contentShow = false
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.collapse-container
  width 960px
  &:last-child
    border-bottom 1px solid #ccc
</style>
