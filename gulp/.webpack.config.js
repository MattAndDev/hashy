import path from 'path'


let base = {
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
          presets: ['es2015'],
          plugins: [
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-strict-mode'
          ]
        }
      }
    ]
  }
}

// test
let test = {
  output: {
    filename: 'main.js',
  }
}

// distribution
let dist = {
  output: {
    filename: 'hashy.js',
  }
}

// merge test and base
for (var attrname in base) { test[attrname] = base[attrname]; }
// export test config
module.exports.test = test

for (var attrname in base) { dist[attrname] = base[attrname]; }
// merge test and base
module.exports.dist = dist
