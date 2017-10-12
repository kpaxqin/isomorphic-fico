import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';

import routes from './routes'

import Router, { initRouter } from './lib/router';

const basename = '';

const history = createHistory({
  basename,
});

const router = Router(routes, {
  history,
  basename,
});

// const currentLocation = history.getCurrentLocation();

function rootRenderer({component, context}) {
  console.log('client is rendering', component);
  render(component, document.getElementById('app'));
}

function resolve(location) {
  router.resolve({path: location.pathname, isServer: false})
    .then(rootRenderer, (e) => {
      if (e.path) {
        history.replace(e.path)
      } else {
        console.log('client side error', e);
      }
    });
}

resolve(history.location);

history.listen((location, action) => {
  console.log('resolve in client')
  resolve(location);
});

