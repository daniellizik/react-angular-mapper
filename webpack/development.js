const webpack = require('webpack')
const path = require('path')
const env = process.env.NODE_ENV

module.exports = {

  devtool: 'inline-source-map',
  noInfo: true,

  entry: {
    master: ['webpack-dev-server/client', `${__dirname}/../src/index.development.js`],
    slave: ['webpack-dev-server/client', `${__dirname}/../test/angular/slave.js`]
  },

  output: {
    publicPath: '/',
    path: '/',
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  resolve: {
    alias: {
      containers: path.resolve(__dirname, '..', 'src', 'containers'),
      components: path.resolve(__dirname, '..', 'src', 'components'),
      decorators: path.resolve(__dirname, '..', 'src', 'decorators'),
      store: path.resolve(__dirname, '..', 'src', 'store'),
      styles: path.resolve(__dirname, '..', 'src', 'styles')
    }
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    })
  ],

  target: 'web'

}
