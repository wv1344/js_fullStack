//index.js
//获取应用实例
import util from '../../utils/index'
const app = getApp()
let page = 0;

Page({
  data: {
    articleList:[]
  },
  //事件处理函数
  showDetail(e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    const contentId = item.contentId
    let visitedID = wx.getStorageSync('visitedID') || [];
    // includes find findIndex  数组查找元素
    if(!visitedID.includes(contentId)){
      visitedID.push(contentId);
    }
    console.log(contentId)
    wx.setStorageSync('visitedID',visitedID);
    wx.navigateTo({
      url:`../detail/index?contentId=${contentId}`
    })
    // contentId
    // 标记为已阅读
    // 设置本地缓存
    // 去到详情页
  },
  onLoad: function () {
    this.requestArticle();
  },
  requestArticle(){
    page++;
    util.request({
      // 分页请求 page
      mock:true,
      url:'list',
      page,
      pageSize:4
    }).then(res => {
      let articleList = res.data.data;
      console.log(articleList)
      articleList = this.formatArticle(articleList)
      // 本地缓存
      // 把标记过属性拿出来，拿到所有文章 判断一下
      // 加上 hasVisited 属性
      let oldArticleList = this.data.articleList;
      let newArticleList = oldArticleList.concat(articleList)
      this.setData({
        articleList:newArticleList
      })
    }).catch(() => {

    })
  },
  formatArticle(articleList){
    let visitedID = wx.getStorageSync('visitedID') || [];
    // 根据一份数据 来返回另一份数据 多用map方法
    articleList = articleList.map(group => {
      group.articles = group.articles.map(item => {
        if(visitedID.includes(item.contentId)){
          item.hasVisited = true
        }
        return item
      })
      return group
    })
    return articleList
  },
  onReachBottom(){
    this.requestArticle()
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
