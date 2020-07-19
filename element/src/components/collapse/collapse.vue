<template>
  <div class="collapse-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
  props: {
    activeNames: Array
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.collapse-container
  border-top 1px solid #ccc
</style>
