var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口文件
  entry: {
    app: './src/main.js'
  },
  // 输出文件 config的配置在config/index.js文件中
  output: {
    path: config.build.assetsRoot, // 导出目录的绝对路径
    filename: '[name].js', // 导出文件的文件名
    publicPath: process.env.NODE_ENV === 'production' // 生产模式下或开发模式下html、js等文件内部引用的公共路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 文件解析
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 自动解析确定的扩展名，使导入模块时不带扩展名
    alias: { // 创建import或require的别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 模块解析
  module: {
    //  关于query 仅由于兼容性原因而存在。请使用 options 代替
    rules: [
      {
        test: /\.(js|vue)$/, // js或vue文件后缀
        loader: 'eslint-loader', // 使用eslint-loader处理（检查语法）
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/, // vue文件后缀
        loader: 'vue-loader', // 使用vue-loader处理
        options: vueLoaderConfig // options是对vue-loader做的额外配置
      },
      {
        test: /\.js$/, // js文件后缀
        loader: 'babel-loader', // 使用babel-loader处理
        include: [resolve('src'), resolve('test')] // 必须处理src和test目录下的文件
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片后缀
        loader: 'url-loader', // 使用url-loader处理
        query: { // query是对loader做的额外配置
          limit: 10000, // 图片小于10000字节时以base64的方式引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 文件名为name.7位哈希值.扩展名
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体文件
        loader: 'url-loader', // 使用url-loader处理
        query: {
          limit: 10000, // 字体文件小于10000字节时以base64的方式引用
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]') // 文件名为name.7位哈希值.扩展名
        }
      }
    ]
  }
}
