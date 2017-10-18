import React, { PropTypes } from 'react';
import toRegex from 'path-to-regexp';
import enroute from 'enroute';

import Router from 'universal-router';
import isBrowser from '../isBrowser'

const getModule = module => module.default || module;

const isFicoPageConfig = obj => typeof obj === 'object' && obj.render;

const ficoPage = function ({getInitData, render}) {
  
  return async function(context, params) {
    const query = {};
    const hasInitDataDependency = !!getInitData;

    const nextContext = {
      initData: hasInitDataDependency 
        ? context.isBrowser && !window.__FICO_STATE_OUTDATED__
          ? window.__FICO_STATE__
          : await getInitData({params, query})
        : undefined,
      ...context
    }

    context.isBrowser && (window.__FICO_STATE_OUTDATED__ = true);

    return {
      context: nextContext,
      component: render(nextContext)
    }
  }
}

const FicoRouter = (routes, {history, basename}) => {
  const options = {
    context: {
      history,
      isBrowser,
    },
    // baseUrl: basename,
    async resolveRoute(context, params) {
      if (!context.route.module) return null;

      let pageModule = getModule(context.route.module);

      if (isFicoPageConfig(pageModule)) {
        pageModule = ficoPage(pageModule);
      }

      const {context: pageContext, component, redirect} = await pageModule(context, params);

      return {
        context: pageContext || context,
        component,
        redirect,
      }
    }
  };
  return new Router(routes, options);
}

async function buildPage({fetchData, render}) {

}

export default FicoRouter;

//
// // server:   match -> data fetching -> store init -> render -> rootRender
// // s-client: match -> check init store -> rehydrate -> render -> rootRender
// const propTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string,
//     search: PropTypes.string,
//   }),
// };
//
// const matchRoute = (path, route) => {
//   const r = toRegex(route);
//   return r.test(path);
// };
//
//
// function asyncQue(fns) {
//   return async function (prop, ctx) {
//     let nextProp = prop;
//     for (let i = 0; i < fns.length; i++) {
//       nextProp = await fns[i](nextProp, ctx);
//     }
//     return nextProp;
//   };
// }
//
// export function initRouter(routes, { basename, history, rootRenderer }) {
//   const routeRenderer = routeModule => (params, props) => {
//     const initProps = {
//       router: {
//         history,
//         params,
//         query: undefined,
//         ...props,
//       },
//     };
//
//     const routeLoader = (typeof routeModule === 'function')
//       ? new Promise(routeModule)
//       : Promise.resolve(routeModule);
//
//     return routeLoader.then((route) => {
//       const { render, providers = [] } = route.default || route;
//       return asyncQue(providers)(initProps, initProps)
//         .then(finalProps => rootRenderer(render(finalProps), finalProps, { params, props }));
//     }, (e) => {
//       console.log('module load failed: ', e)
//     })
//   };
//
//   const enrouteConfig = {};
//
//   for (const i in routes) {
//     enrouteConfig[addBasename(i, basename)] = routeRenderer(routes[i]);
//   }
//
//   const result = enroute(enrouteConfig);
//
//   return result ? result : Promise.reject(new Error('No matched route founded'))
// }
//
// function addBasename(path, basename) {
//   return cleanPath(`${basename}/${path}`);
// }
//
// function cleanPath(path) {
//   return path.replace(/(\/)+/g, '/');
// }
//
export Link from './Link';
//
// export { propTypes, matchRoute };


