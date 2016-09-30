import path from 'path'
module.exports = {
  output: {
    filename: 'hashy.js',
  },
  resolve: {
      alias: {
      }
  },
  resolveLoader: {
    root: path.join(__dirname, '..',"node_modules")
  },
  devtool: 'inline-source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
