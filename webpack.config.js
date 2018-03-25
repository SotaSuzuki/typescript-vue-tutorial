const path = require('path')

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

    ]
  },

  devServer: {

  },

  performance: {

  },

  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  console.log('env: ', 'production')
}
