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

function rootRenderer({component, redirect}) {
  console.log('client is rendering', component);
  render(component, document.getElementById('app'));
}

router.resolve({path: window.location.pathname}).then(rootRenderer);

history.listen((location, action) => {
  router.resolve({path: location.pathname}).then(rootRenderer);
});

