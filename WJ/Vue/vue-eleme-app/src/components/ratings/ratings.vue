<template>
  <div class="page">
    <div class="header">
      <div class="left">
        <div class="border">
          <span class="score">{{rating.score}}</span>
          <p class="fen">综合评分</p>
          <span class="rank-rate">
            高于周边商家{{rating.rankRate}}%
          </span>
        </div>
      </div>
      <div class="right">
        <div class="service-score">
          <span class="title">服务态度</span>
          <star :sendscore="rating.serviceScore" class="star"></star>
          <span class="rscore">{{rating.serviceScore}}</span>
        </div>
        <div class="food-score">
          <span class="title">商品评分</span>
          <star :sendscore="rating.foodScore"></star>
          <span class="rscore">{{rating.foodScore}}</span>
        </div>
        <div class="delivery-time">
          <span class="title">送达时间</span>
          <span class="time">{{rating.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="bd"></div>
      <div class="selecter">
        <div class="sayall">全部24</div>
        <div class="sayyes">满意18</div>
        <div class="sayno">不满意6</div>
      </div>
      <div class="showCon">
        
      </div>
    </div> 
  </div>
</template>

<script>
import star from '@/components/star/star'
export default {
  data(){
    return{
      rating:[]
    }
  },
  components: {
    star
  },
  created () {
    this.$http
      .get("https://www.easy-mock.com/mock/5d00b0810507eb134409028f/vue/vue-eleme-seller")
      .then(res => {
        if (res.data.errno === 0) {
          this.rating = res.data.data;
        }
      });
  },
  updated() {
    console.log(this.rating.foodScore)
  },
}
</script>

<style lang="stylus" scoped>
.page
  width 100%
  height 100%
  margin 0
  padding 0
  .header
    width 100%
    .left
      top 0
      right 0
      bottom 0
      left 0
      float left
      width 40%
      display inline-block
      text-align center
      padding-top 10px
      padding-bottom 10px
      .border
        border-right 1px solid #EBEBEB
      .score
        display block
        color #F59C1F
        font-size 22px
        margin-top 10px
      .fen
        display block
        font-weight 600
        font-size 14px
        margin-top 10px
      .rank-rate
        display block
        color #A4A6AB
        margin-top 10px
        font-size 14px
        padding-bottom 10px
    .right
      display inline-block
      margin-left 20px
      margin-top 20px
      font-size 12px
      .title
        height 26px
        line-height 26px
        font-weight 600      
        line-height 26px
      .delivery-time
        .time
          color #a4a6ab
          margin-left 5px
      .star
        display inline-block
        padding-left 5px
      .rscore
        line-height 26px
        color #F59C1F
        margin-left 4px
  .content
    .bd
      height 18px
      width 100%
      margin-top 10px 
      background-color #F4F5F9
      border-top 1px solid #ECECED
      border-bottom 1px solid #ECECED
    .selecter
      width 100%
      height 70px
      line-height 70px
      font-size 14px
      border-bottom 1px solid #F9F9F9
      .sayall
        background-color #039EDF
        color #ffffff
        display inline-block
        width 70px
        height 35px
        line-height 35px
        text-align center
        margin-left 20px
      .sayyes
        display inline-block
        width 70px
        height 35px
        line-height 35px
        text-align center
        margin-left 20px
        background-color #d5eefa
      .sayno
        display inline-block  
        background-color #DEDFE1
        width 70px
        height 35px
        line-height 35px
        text-align center
        margin-left 20px
</style>
