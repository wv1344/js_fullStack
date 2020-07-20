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
  }
}
</script>

<style lang="stylus" scoped>
.collapse-container
  width 960px
  &:last-child
    border-bottom 1px solid #ccc
</style>
