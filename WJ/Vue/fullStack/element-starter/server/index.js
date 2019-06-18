const express = require('express');

const http = require('http');

const app = express();  // 应用
//  api 后端api 服务
const api = require('./api');

// 设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');

//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

app.use(api);

app.set('port',3000);
http.createServer(app).listen(app.get('port'),'0.0.0.0',function(){
  console.log('Express server listening on port ')
})