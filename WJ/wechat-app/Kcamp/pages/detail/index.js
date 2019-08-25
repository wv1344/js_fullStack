// pages/detail/index.js
import util from '../../utils/index'
import WxParse from '../../lib/wxParse/wxParse'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  init(id){
    console.log(id);
    this.requestDetail(id).then(res => {
      // console.log(res.data.data.content)
      const content = res.data.data.content
      WxParse.wxParse('content', 'html', content, this, 5);
    })
  },
  requestDetail(id){
    // Promise.all([p1,p2]) => p
    // Promise.race
    return  new Promise((resolve,reject) => {
      util.request({
        mock:true,
        url:'detail'
      }).then(res => resolve(res))
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let contentId = options.contentId;
    console.log(contentId)
    this.init(contentId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})