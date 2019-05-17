// 云函数入口文件
const cloud = require('wx-server-sdk')

const env = 'wv1344-rtt93' /*环境id*/

// 初始化 cloud
cloud.init()

// 获取服务器的句柄
const db = cloud.database({env})

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const userInfo = event.userInfo
  return await db.collection('group').add({
    data:{
      name:event.groupName,
      createBy:userInfo.openId,
      createTime:new Date(),
      deleted:false,
      updateTime:new Date()
    }
  }).then(res => {
    return db.collection('user-group').add({
      data:{
        groupId:res._id,
        userId:userInfo.openId,
        invalid:false
      }
    })
  })

}