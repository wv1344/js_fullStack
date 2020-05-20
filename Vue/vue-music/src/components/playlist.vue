<template>
  <div class="showPlayList">
    <div class="list-mask" v-show="showPlayList" @click="handleClose"></div>
    <div class="playlist-wrapper" :class="{showList:showPlayList}">
      <div class="control">
        <span class="method">
          循环播放（{{playList.length}}）首
        </span>
        <span class="allDel">
          清空
        </span>
      </div>
      <div class="item" v-for="(item,index) in playList" :key="index">
        <div class="info" :class=" currentSong.id === item.id ? 'current' : '' ">
          <span>{{item.name}}</span> · 
          <span>{{item.artists[0].name}}</span>
        </div>
        <span class="del">
            <i class="icon">&#xe656;</i>
          </span>
      </div>
      <div class="close" @click="handleClose">
        关闭
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'

export default {
  name: 'playList',
  computed: {
    ...mapGetters(['showPlayList','playList','currentSong']),
    },
  data () {
    return {
    }
  },
  methods:{
    ...mapMutations({
      setShowPlayList:'SET_SHOW_PLAY_LIST'
    }),
    handleClose(){
      this.setShowPlayList(false)
    }
  }
}

</script>
<style lang='stylus' scoped>
@import "../assets/css/function"
.showPlayList
  color rgba(255, 255, 255, 0.8)
  font-size 14px
  .playlist-wrapper
    background rgba(0, 0, 0, 0.8)
    position absolute
    bottom 0
    left 0
    width 100%
    opacity 0
    transform translateY(200%)
    z-index 1005
    display none
    &.showList 
      transform translateY(0)
      display block
      transition all 0.3s ease
      opacity 1
    .control 
      display flex
      justify-content space-between
      margin 0 px2rem(20px)
      line-height px2rem(100px)
    .item
      display flex
      justify-content space-between
      margin 0 px2rem(20px)
      line-height px2rem(100px)
      border-top 1px solid rgba(255, 255, 255, 0.3)
      .info 
        &.current
          color #eb234a
    .close
      text-align center
      padding px2rem(30px) 0
      border-top 1px solid rgba(255, 255, 255, 0.3)
  .list-mask
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 1001
    background rgba(0, 0, 0, 0.3)

</style>