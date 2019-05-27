// http node自带模块
const http = require('http');
// 2 /user/lists
// 1 post
// [{name:'1'},{name:'2'}]
// 监听在 8080 端口的服务
const userLists = [{name:'1'},{name:'2'}];
http.createServer((req,res) =>{
  // 向浏览器返回内容
  const method = req.method;
  const url = req.url;
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  if (method.toLowerCase() === 'post' && url === '/user/lists'){
    res.end(JSON.stringify(userLists));
  }else{
    res.end('请求方式不对');
  }
  
}).listen(8080,() => {
  console.log('server is running 8080');
})