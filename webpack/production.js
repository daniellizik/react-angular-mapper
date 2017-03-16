const webpack = require('webpack')
const env = process.env.NODE_ENV

module.exports = {

  entry: ['webpack/hot/dev-server', `${__dirname}/../index.js`],

  output: {
    path: `${__dirname}/../dist`,
    filename: 'bundle.min.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    })
  ]

};
