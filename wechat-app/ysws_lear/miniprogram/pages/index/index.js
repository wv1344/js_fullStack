Page({
  http:function(){
    // 从本地到云端
    // 手机本机端的
    // 百度云
    wx.cloud.callFunction({
      name:'http'
    }).then(res => {
      console.log(res);
    })
  }
})