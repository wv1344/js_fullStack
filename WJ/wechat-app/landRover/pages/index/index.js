//index.js
//获取应用实例
const app = getApp()
const db = require('../../assets/db.js');
// const shops = require('../../assets/shop.js');
const testDrive = require('../../assets/module.js');
// console.log(shops);
Page({
  data: {
   slides:db.slides
  },  
  testDrive,
  handleReadMore(event){
    const id = event.target.dataset.id;
    wx.navigateTo({
      url:`/pages/vehicles/index?id=${id}`
    })
  },

})