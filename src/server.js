import 'babel-polyfill'
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import {mapValues} from 'lodash';
import createHistory from 'history/createMemoryHistory';
import fs from 'fs';
import path from 'path';
import _ from 'lodash'
import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.dev.config'
import webpackDevMiddleWare from 'webpack-dev-middleware';

import Layout from './layout';

import Router, { initRouter } from './lib/router';

import history from './history'

let routes = require('./routes').default;

let router = Router(routes, {
  /* pass a factory function and bind with res/req in server side.
  *  so that we can use history.push/replace as the only way to redirect route in business logic
  */
  history,
});

function runServer() {
  const server = express();

  const compiler = webpack(webpackConfig);

  const publicPath = webpackConfig.output.publicPath;

  let assets = null;

  console.log(`ENV: ${process.env.NODE_ENV}`)

  if (process.env.NODE_ENV === 'production') {
    const assetsStr = fs.readFileSync(path.resolve(__dirname, '../assets.json'), {encoding: 'UTF-8'});
    assets = _.mapValues(JSON.parse(assetsStr), (v)=>Object.values(v))

    server.use(express.static(path.resolve(__dirname, '../')))
  } else {
    server.use(webpackDevMiddleWare(compiler, {
      publicPath,
      quite: true,
      serverSideRender: true
    }));
  }
  

  server.get('*', function (req, res) {
    try {
      console.log('url: ', req.url);

      if (process.env.NODE_ENV !== 'production') {
        assets = res.locals.webpackStats.toJson().assetsByChunkName;
      }

      router.resolve({path: req.url, isServer: true}).then(({component, context, redirect}) => {
        console.log('rendering')
        const props = {
          title: 'Test',
          initialState: context.initData,
          children: ReactDOMServer.renderToString(component),
          publicPath,
          assets: assets, //TODO read from static json in production
        };
        const html = ReactDOMServer.renderToStaticMarkup(
          <Layout {...props}/>
        );
        res.end(html);
      }).catch((e) => {
        console.log('error', e)
        if (e.path) {
          res.redirect(302, e.path);
        } else {
          res.end(e.stack || e.message);
        }
      });
    } catch(error) {
      res.end(error.stack)
    }
  });

  const port = 3008;

  server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
  })
}

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require
    routes = require('./routes').default;
    router = Router(routes, {
      history,
    });
  });
}

runServer();

export default runServer;
