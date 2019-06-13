const request = require('request');

module.exports = (url) => {
  return new Promise((req,rej) => {
    request({
      url,
      json:true
    },(err,res,body) => {
      console.log('error',err);
      // console.log('body', body);
      req(body);
    })
  })
}