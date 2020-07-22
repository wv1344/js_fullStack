<template>
  <div class="collapse-container">
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
      baseId: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this.update(this.value)
    })
  },
  watch: {
    value (newVal) {
      this.update(newVal)
    }
  },
  methods: {
    update (val) {
      this.$children.forEach(child => {
        if (Array.isArray(val)) {
          val.forEach(item => {
            if (child.name === item) {
              child.contentShow = true
            }
          })
        }
        if (child.name === val) {
          child.contentShow = true
        }
      })
    },
    change (id) {
      let actives = []
      this.$children.forEach(child => {
        if (child._uid === id) {
          child.contentShow = !child.contentShow
        } else {
          if (this.accordion) {
            child.contentShow = false
          }
        }
        if (child.contentShow) {
          actives.push(child.name)
        }
      })
      this.$emit('input', Array.isArray(this.value) ? actives : actives[0] || '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.collapse-container
  width 95%
  &:last-child
    border-bottom 1px solid #ccc
</style>
