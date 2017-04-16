require('babel-register')
require('babel-polyfill')
require('ignore-styles');

const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.dev.config');

const runServer = require('./src/server').default;

const compiler = webpack(webpackConfig);

compiler.run(function (error, stats) {
  if (error) {
    console.log('error: ', error);
    return;
  }
  console.log('************ webpack build success ************');

  runServer();
});
