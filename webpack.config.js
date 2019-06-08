var path=require('path')
const webpack=require('webpack')
module.exports={
  entry: path.join(__dirname,"./src/main.js"),
  output: {
    path:path.join(__dirname,"./public"),
    filename:"index.js"
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },//处理css文件的规则
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve:{
    alias:{
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}