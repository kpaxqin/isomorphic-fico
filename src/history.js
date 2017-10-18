import createMemHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import isBrowser from './lib/isBrowser'

const basename = '';

export default isBrowser 
  ? createBrowserHistory({
    basename
  })
  : createMemHistory({
    basename,
  });