const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtraceTextPlugin = require('extract-text-webpack-plugin');
module.exports = {

  // 入口 开发目录下的index.js
  entry:'./src/index.js',
  // 出口
  output:{
    path:path.resolve(_dirname,'dist'),
    filename:'[name].js'
  },
  module:{
    // 分模块，使用loader去单独打理
    rules:[
      {
        test:/\.js$/,
        include:[
          path.resolve(_dirname,'src')
        ],
        use:'babel-loader'
      },
      {
        test:/\.less$/,
        // 在load的同时，单独的生成一个css文件，
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:[
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:[
          {
            loader:'file-loader'
          }
        ]
      }
    ]
  },
  resolve:{
    extensions:[".js"],
    mkodules:[
      "node_modules",
      path.resolve(_dirname,'src')
    ]
  },
  plugin:[
    new HTMLWebpackPlugin({
      filename:'index.html',
      template:'src/index.html'
    }),
    new ExtraceTextPlugin('[name].css')
  ]
}