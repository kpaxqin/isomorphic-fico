const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const gitInfo = require('git-rev-sync');

const config = require('./nodeConfig');

const rootPath = process.cwd();
const srcPath = path.resolve(rootPath, 'src');

module.exports = {
  context: srcPath,
  entry: {
    vendor: [
      'classnames',
      'history',
      'lodash',
      'babel-polyfill',
      'whatwg-fetch',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-action-tools',
      'redux-logger',
      'redux-thunk',
    ],
    app: ['./client.jsx']
  },
  output: {
    path: path.resolve(rootPath, '_dist'),
    filename: 'scripts/[name].[hash].js',
    publicPath: '/',
    chunkFilename: '[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['react-hot-loader/webpack', 'babel-loader'],
      exclude: /node_modules/,
      include: srcPath
    }, {
      test: /\.css?$/,
      use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract([
        {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
        {loader: 'less-loader', options: {sourceMap: true}}
      ])
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/,
      use: 'file-loader?name=images/[name].[hash:6].[ext]',
      include: srcPath
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/,
      use: 'file-loader?name=images/[name].[ext]',
      include: /node_modules/
    }, {
      test: /\.svg$|\.woff2?$|\.ttf|\.eot$/,
      use: 'file-loader?name=fonts/[name].[ext]',
      include: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [path.resolve(rootPath, "node_modules")]
  },
  plugins: [
    new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.config': JSON.stringify(config)
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.tpl.html',
    //   template: './index.tpl.html',
    //   inject: false,
    //   // COMMIT_HASH: gitInfo.long()
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: Infinity,
      filename: 'scripts/[name].[hash].js'
    }),
  ]
};
