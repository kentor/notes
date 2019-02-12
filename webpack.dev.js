const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  devServer: {
    allowedHosts: ['localhost', '.local'], // .local allows testing on my phone
    contentBase: path.join(__dirname, 'public'), // Serves the index.html
    host: '0.0.0.0', // Allows testing on my phone
    hotOnly: true, // Don't fallback to page refresh on build failures
    port: 10000,
    // Conceptually puts all built output under this folder. The full url is
    // needed to get HMR to work.
    publicPath: '/js/',
  },
  devtool: false,
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
