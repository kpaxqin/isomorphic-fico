const webpack = require('webpack');

const baseConfig = require('./webpack.config.js');

module.exports = Object.assign({}, baseConfig, {
  watch: true,
  devtool: 'cheap-module-source-map',
  // entry: mergeEntry(),
  // plugins: [new webpack.HotModuleReplacementPlugin()].concat(baseConfig.plugins)
});

function mergeEntry() {
  baseConfig.entry.app = [
    `webpack-dev-server/client?`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server'// "only" prevents reload on syntax errors
  ].concat(baseConfig.entry.app);
  return baseConfig.entry;
}
