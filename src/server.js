import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import createHistory from 'history/createMemoryHistory';

import express from 'express';

import {routeConfig as routes} from './routes'

import { initRouter } from './lib/router';

const basename = '';// || _.get(process.env.config, 'server.basename');

const history = createHistory({
  basename,
});

const indexHtml = fs.readFileSync('./_dist/index.tpl.html', 'utf-8');

function rootRenderer(pageComponent, finalProps) {
  const componentHtml = ReactDOMServer.renderToString(pageComponent);
  const scriptStr = `
        window.__FICO_STATE__ = {
          data: ${JSON.stringify(finalProps.data)}
        }
      `;
  const html = indexHtml
    .replace(/__FICO_COMPONENT__/g, componentHtml)
    .replace(/'__FICO_SCRIPT__'/g, scriptStr);

  return html
}

const router = initRouter(routes, {
  rootRenderer,
  history,
  basename,
});

function runServer() {
  const server = express();

  server.use(express.static('_dist'));

  server.get('*', function (req, res) {
    try {
      console.log('url: ', req.url);

      router(req.url).then((html) => res.end(html));
    } catch(error) {
      console.log('error')
      res.end(error.stack)
    }
  });

  const port = 3000;

  server.listen(port, () => {
    console.log(`server started at localhost:${port}${basename}`)
  })
}

export default runServer;
