

module.exports = {
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
  }
}
