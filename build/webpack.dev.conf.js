var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 开发环境下的webpack配置，通过merge方法合并webpack.base.conf.js基础配置
module.exports = merge(baseWebpackConfig, {
  // 调用utils生成rules，此处传入sourceMap配置
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  // 插件配置
  plugins: [
    new webpack.DefinePlugin({ // 编译时配置的全局变量
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NoEmitOnErrorsPlugin(), // 不触发错误，即编译后运行的包正常运行
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 自动生成html文件
      filename: 'index.html', // 生成的文件名
      template: 'index.html', // 模版
      inject: true
    }),
    new FriendlyErrorsPlugin() // 友好的错误提示
  ]
})
