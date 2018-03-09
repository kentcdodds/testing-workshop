const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.module\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: true, camelCase: true}},
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
}
