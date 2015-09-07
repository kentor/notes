const path = require('path');

module.exports = {
  // devtool: 'sourcemap',

  entry: [
    'webpack-dev-server/client?http://localhost:45537/js/',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'js', 'app.js'),
  ],

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
        test: /\.js$/,
      },
    ],
  },

  output: {
    filename: 'app.js',
    publicPath: 'http://localhost:45537/js',
  },
};
