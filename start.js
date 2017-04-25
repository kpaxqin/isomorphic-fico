// require('babel-register')
require('babel-polyfill')
// require('ignore-styles');

global._fico = {
  rootPath: process.cwd()
};

// const runServer = require('./src/server').default;


//
const webpack = require('webpack')
const serverConfig = require('./webpack/webpack.server');

const compiler = webpack(serverConfig);

let firstTime = true;
compiler.watch(undefined, () => {
  firstTime && (function() {
    require('./_dist/server').default;
    firstTime = false;
  })()
});
