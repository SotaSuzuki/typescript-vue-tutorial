const path = require('path')
const webpack = require('webpack')

const MODE = Object.freeze({
  DEV: 'development',
  PROD: 'production',
})

module.exports = {
  mode: MODE.DEV,

  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      },
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    // noInfo: true,
    // open: true
  },

  performance: {
    hints: false
  },

  devtool: '#eval-source-map'
}

switch (process.env.NODE_ENV) {
  case 'production': {
    console.log('start production mode')
    module.exports.mode = MODE.PROD
    module.exports.devtool = '#source-map'
    module.exports.optimization = {
      minimize: true
    }
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
    ])
    break
  }

  case 'development': {
    console.log('start development mode')
    break
  }

  default: {
    break
  }
}
