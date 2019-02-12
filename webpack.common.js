const path = require('path');

module.exports = {
  entry: './src/js/app.tsx',
  output: {
    chunkFilename: '[name].js',
    filename: 'app.js',
    path: path.join(__dirname, 'public', 'js'),
    // This is needed for HMR to work as well as code splitting. Tells the main
    // bundle where to look for other chunked bundles or HMR artifacts.
    publicPath: '/js/',
  },
  module: {
    rules: [{exclude: /node_modules/, loader: 'babel-loader', test: /\.tsx?$/}],
  },
  resolve: {
    alias: {
      App: path.join(__dirname, 'src', 'js'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
};
