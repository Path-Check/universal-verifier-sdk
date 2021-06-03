const path = require('path');

module.exports = {
  mode: "production",
  entry: "./lib/main.js",
  devtool: "source-map",
  output: {
    filename: 'universal-verifier.sdk.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'UV',
    libraryTarget: 'umd',
  },
  target: 'web',
  optimization: {
    minimize: true
  }
};