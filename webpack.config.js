const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, ''),
  entry: {
    'inject/inject': './src/inject/inject.js',
    'browserAction/browserIndex': './src/browserAction/browserIndex.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/build/src'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { 
        from: 'src/browserAction/index.html', 
        to: './browserAction/index.html'
      },
      {
        from: 'src/browserAction/index.css',
        to: './browserAction/index.css'
      },
      {
        from: 'src/browserAction/bulma.css',
        to: './browserAction/bulma.css'
      }
    ], {
      copyUnmodified: false 
    })
  ]
}