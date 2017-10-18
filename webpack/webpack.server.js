const path = require('path');
const webpack = require('webpack');

const fs = require('fs');
const config = require('./nodeConfig');
const pkg = require('../package.json');

const rootPath = process.cwd();
const srcPath = path.resolve(rootPath, 'src');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: srcPath,
  watch: !(process.env.NODE_ENV === 'production'),
  // devtool: 'eval',
  entry: [
    'webpack/hot/poll?1000',
    './server'
  ],
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    path: path.resolve(rootPath, '_dist/server'),
    filename: 'index.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['react-hot-loader/webpack', 'babel-loader'],
      exclude: /node_modules/,
      include: srcPath
    }, {
      test: /\.(less|css)$/,
      use: ['ignore-loader']
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ["node_modules"],
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.config': JSON.stringify(config)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

