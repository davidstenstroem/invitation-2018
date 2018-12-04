const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const port = 14753
const host = '0.0.0.0'

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    host,
    port,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { module: true }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
