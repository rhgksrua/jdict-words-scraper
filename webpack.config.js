
module.exports = {
  entry: {
    inject: './src/inject/inject.js',
    'foobar.spec': './src/foobar.spec.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/build'
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
