import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';

import routes from './routes'

import { initRouter } from './lib/router';

const basename = '';

const history = createHistory({
  basename,
});

function rootRenderer(pageComponent) {
  render(pageComponent, document.getElementById('app'));
}

const router = initRouter(routes, {
  rootRenderer,
  history,
  basename,
});

router(window.location.pathname, basename);

history.listen((location, action) => {
  router(addBasename(location.pathname, basename), { action });
});

function addBasename(path, basename) {
  return cleanPath(`${basename}/${path}`);
}

function cleanPath(path) {
  return path.replace(/(\/)+/g, '/');
}
