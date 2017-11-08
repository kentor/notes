const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [path.join(__dirname, 'src', 'js', 'app.js')],

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js$/,
      },
    ],
  },

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public', 'js'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      screw_ie8: true,
      unsafe: true,
    }),
  ],
};
