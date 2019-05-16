const QQ_MAP_KEY = 'KFRBZ-HLPKX-BBD43-7IOFW-4AH5F-62BKM';

wx.cloud.init({
  env:'wv1344-rtt93'
})
const db = wx.cloud.database()

// 添加心情
export const addEmotion = (openid,emotion) => {
  return db.collection('diary').add({
    data:{
      openid,
      emotion,
      tsModefied:Date.now()
    }
  })
}

// 获取位置
export const geocoder = (lat,lon,success = () => {},fail = () => {}) =>{
  return wx.request({
    url:'https://apis.map.qq.com/ws/geocoder/v1/',
    data:{
      location:`${lat},${lon}`,
      key:QQ_MAP_KEY,
      get_poi:0
    },
    success,
    fail
  })
}

// 获取天气
export const getWeather = (lat,lon) => {
  return wx.cloud.callFunction({
    name:'he-weather',
    data:{
      lat,
      lon
    }
  })
}