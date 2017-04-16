import pathToRegexp from 'path-to-regexp';

export default function makePath(path, params, query) {
  const toPathRegexp = pathToRegexp.compile(path);
  const basePath = params ? toPathRegexp(params) : path;

  const queryStr = query
    ? Object.keys(query)
      .map(k => `${k}=${query[k]}`)
      .join('&')
    : '';

  return `${basePath}?${queryStr}`;
}
