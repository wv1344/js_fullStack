<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
    <!-- <use xlink:href="star"></use> -->
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: String
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

</style>
