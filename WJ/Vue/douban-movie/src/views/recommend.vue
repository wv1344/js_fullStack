<template>
  <div class="recommend">
    <!-- 首页整个页面都支持 better-scroll滚动 -->
    <ScrollView >
      <list-block :movies="playingMovies" :title="`正在热映(${playingCount})`" 
      @more="handleMore" @select="handleSelect"></list-block>
      <div class="space" style="background-color:#f6f6f6;height:10px"></div>
      <list-block :movies="commingMovies" :title="`即将上映(${commingCount})`" 
       @more="handleMore" @select="handleSelect"></list-block>
       
    </ScrollView>
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock'
export default {
  data () {
    return {
      playingMovies:[],
      playingCount:0,
      commingMovies:[],
      commingCount:0,
    }
  },
  components: {
    'list-block':ListBlock 
  },
  methods: {
    getMovie(){
      // this.$axios.get('/get_hot').then(res => {
      this.$axios.get('/api/api/movie/get_hot').then(res => {
        console.log(res)
        if(res.code === 1001){
          const { comming,playing } = res.result;
          this.playingMovies = playing.movies
          this.playingCount = playing.count
          this.commingMovies = comming.movies
          this.commingCount = comming.count
        }
      })  
    },
    handleMore(e){
      console.log('more'+e)
    },
    handleSelect(id){
      this.$router.push({
        path:`/movie/${id}`
      })
    }
  },
  created () {
    this.getMovie()
  }
}
</script>

<style>

</style>
