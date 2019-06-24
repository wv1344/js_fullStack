<template>
  <div class="search">
    <div class="search-box-wrapper">
      <!-- 搜索框 -->
      <v-search-box></v-search-box>
    </div>
    
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <!-- 热门搜索 -->
      <v-scroll class="shortcut" ref="shortcut" :data="shortcut" :refreshDelay="refreshDelay">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li 
                class="item"
                v-for="(item,index) in hotKey"
                :key="index"
                @click="addQuery(item.first)"
              >
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
        </div>
      </v-scroll>
    </div>
  </div>
</template>

<script>
import search from '@/components/searchBox'
import scroll from '@/components/scroll'
export default {
  data(){
    return{
      query:false,
      hotKey:[
        {
          first:'许嵩'
        },
        {
          first:'朴树'
        },
        {
          first:'张学友'
        },
        {
          first:'张国荣'
        }
      ]
    }
  },
  components: {
    'v-search-box':search,
    'v-scroll':scroll
  }
}
</script>

<style lang="stylus" scoped>

</style>
