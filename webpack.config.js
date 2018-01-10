const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    render: './app/routerConf.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
		filename: "[name].js"
  },
  target: 'electron-renderer',  //在electron的环境打包
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'my-app',
      template: './app/index.html',
      filename: 'index.html',
      hash: true
    })
	]
};