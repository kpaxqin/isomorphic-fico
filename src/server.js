import 'babel-polyfill'
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import createHistory from 'history/createMemoryHistory';

import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.dev.config'
import webpackDevMiddleWare from 'webpack-dev-middleware';

import Layout from './layout';

import { initRouter } from './lib/router';

const basename = '';// || _.get(process.env.config, 'server.basename');

const history = createHistory({
  basename,
});

let routes = require('./routes').default;

function rootRenderer(pageComponent, finalProps) {
  return {
    content: pageComponent,
    state: finalProps
  };
}

let router = initRouter(routes, {
  rootRenderer,
  history,
  basename,
});

function runServer() {
  const server = express();

  const compiler = webpack(webpackConfig);

  server.use(webpackDevMiddleWare(compiler, {
    publicPath: '/',
    quite: true,
    serverSideRender: true
  }));

  server.get('*', function (req, res) {
    try {
      console.log('url: ', req.url);

      router(req.url).then((pageObj) => {
        const props = {
          title: 'Test',
          initialState: pageObj.state,
          content: ReactDOMServer.renderToString(pageObj.content),
          assets: res.locals.webpackStats.toJson().assetsByChunkName
        };
        const html = ReactDOMServer.renderToString(
          <Layout {...props}/>
        );
        res.end(html);
      }).catch((e) => {console.log('error', e)});
    } catch(error) {
      res.end(error.stack)
    }
  });

  const port = 3000;

  server.listen(port, () => {
    console.log(`server started at localhost:${port}${basename}`)
  })
}

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require
    routes = require('./routes').default;
    router = initRouter(routes, {
      rootRenderer,
      history,
      basename,
    });
  });
}

runServer();

export default runServer;
