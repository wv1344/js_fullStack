// 对象

const googleMap = {
  show () {
    console.log('开始渲染google地图')
  }
}

const baiduMap = {
  // 为互换做准备
  show () {
    console.log('开始渲染百度地图')
  }
}

const gaodeMap = {
  // 为互换做准备
  show () {
    console.log('开始渲染高德地图')
  }
}


const renderMap = (map) => {
  // map 检测
  if (map.show instanceof Function) {
    map.show()
  }
  
  // googleMap.show();
  // baiduMap.show();
  // 分支太多
  // if(type === 'baidu'){baiduMap.show()}
  // if(type === 'google'){googleMap.show()}
}

renderMap(baiduMap)
renderMap(googleMap)