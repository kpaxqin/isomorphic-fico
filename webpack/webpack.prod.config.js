const webpack = require('webpack');
const _ = require('lodash');
const baseConfig = require('./webpack.config.js');

const prodConfig = Object.assign({}, baseConfig, {
  plugins: [
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
