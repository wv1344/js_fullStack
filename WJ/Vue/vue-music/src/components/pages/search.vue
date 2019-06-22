<template>
  <div class="search">
    <div class="search-box-wrapper">
      <!-- 搜索框 -->
      <v-search></v-search>
    </div>
  </div>
</template>

<script>
import search from '@/components/searchBox'
export default {
  components: {
    'v-search':search
  }
}
</script>

<style lang="stylus" scoped>

</style>
