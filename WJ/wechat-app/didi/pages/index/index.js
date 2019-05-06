//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/index';
Page({
  data: {
    navData:[],
    scrollLeft: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.requestCart();
  },
  requestCart(){
    util.request({
      url:'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get'
    }).then((res)=>{
      this.setData({
        navData:res.data.navData
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
