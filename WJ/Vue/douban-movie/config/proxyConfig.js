module.exports = {
  proxy: {
    '/api': {
      // target: 'http://47.110.74.37:4000',  // 接口域名
      target: 'http://movie.ihaoze.cn', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
