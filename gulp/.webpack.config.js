import path from 'path'
module.exports = {
  output: {
    filename: 'main.js',
  },
  resolve: {
      alias: {
        bootstrap: "bootstrap/dist/js/bootstrap.js",
        owlcarousel: "owlcarousel-pre/owl-carousel/owl.carousel.js"
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
