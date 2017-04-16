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




function runServer() {
  const server = express();

  const indexHtml = fs.readFileSync('./_dist/index.tpl.html', 'utf-8');


  server.use(express.static('_dist'));

  server.get('*', function (req, res) {
    // res.end(indexHtml);
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

      res.end(html);
    }

    try {
      console.log('url: ', req.url);
      const router = initRouter(routes, {
        rootRenderer,
        history,
        basename,
      });

      router(req.url)
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
