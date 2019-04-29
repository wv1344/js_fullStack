// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const got = require('got');

let appid = 'wx77e18e727ca845c0';
let sceret = '303299b307b27b7f54b24a11d6d7a542';

// let msgCheckUrl = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=';
// let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + sceret;

// // 云函数入口函数
exports.main = async (event, context) => {
//   // 令牌许可
//   let tokenResponse = await got(tokenUrl);
//   let token = JSON.parse(tokenResponse.body).access_token;
//   console.log(token);
//   let checkResponse = await got(msgCheckUrl + token,{
//     body:JSON.stringify({
//       // content:event.text

//     })
//   });
//   console.log(checkResponse)
  return event.a + event.b;
}