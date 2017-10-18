const webpack = require('webpack');
const _ = require('lodash');
const path = require('path')
const baseConfig = require('./webpack.config.js');
const AssetsPlugin = require('assets-webpack-plugin');

const prodConfig = Object.assign({}, baseConfig, {
  plugins: [
    new AssetsPlugin({
      path: path.resolve(__dirname, '../_dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ].concat(baseConfig.plugins)
});

module.exports = prodConfig;
