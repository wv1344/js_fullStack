 大前端全栈开发思路

 在前端 vue 项目目录下，建一个 server 用来做 mvc 就好了

- 前后端分离
  后端负责提供 api 在 server 目录下
  前端 src
  后端就负责 API 服务
  

1. 后端在3000端口，未来等着nginx 80 -> 3000 
    /api API服务 等着前端调用  / vue 打包好的dist目录 index.html readFile返回
2. 前端一般在8080 vue-router vuex axios 
3. 前后端联调，api 数据 -> vue 组件的 data
4. 跨域  前端面试最重要的问题
   domain 域名
   端口， cross domain
   前端不允许 安全问题
   前端考虑 页面上显示的安全
   后端考虑

- 前端 
  book.douban.com
  www.douban.com
  subdomian:domain:port 都一样
  js同源机制，相同的源是值得信赖的
  前后端 8080：3000 跨域
  不跨域， fetch('/api/user/login') 404
  3000 /api/ proxy 代理
  /api/ 匹配
  targethost:3000/api,
  changeOrigin:true
  发出去的请求也不跨域