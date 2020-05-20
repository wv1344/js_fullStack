- 基于 vue 2.0 + vuex + vueRouter 全家桶实现方案来模拟网易云音乐 webapp 项目，
  css 预编译工具使用的是 sass ，音乐上下滚动加载用的是 betterScore，全面采用 es6 风格代码。

- 解决了哪些问题
  1. 图片懒加载  vue-lazyload
  2. 前后端分离  
      使用 node.js NeteaseCloudMusicAPI proxy 8080 + 3000
  3. fastClick 
  4. 设计了 store
      songs index song singer mode favoriteList
      searchHistory playHistory 
  5. iconfont
  6. eslint
	7. ......

- 上班，vue 项目， 分析清楚目录结构
    1. components/  跟路由挂钩  工作的入口

		2. store/       全局共享 分模块 了解关键状态

		3. common/     公共组件不用写

		4. api/         前后端的协作方式