import React, { PropTypes } from 'react';
import HomePage from './home/pages/Home';
import _ from 'lodash';
function async(value) {
  return new Promise(function (res) {
    console.log('Performing async');
    setTimeout(() => {res(value)}, 1000);
  })
}

class RedirectionError extends Error {
  constructor(path) {
    super();
    this.path = path;
  }
}

function getInitData({redirect}) {
  return async().then(d => {
    // throw new RedirectionError('/test/123');
    return Math.random() * 100;
  }, () => {
  })
}

const ficoPage = function ({getInitData, render}) {

  return async function(context, params) {
    const query = {};
    const initData = context.isBrowser
      ? window.__FICO_STATE__
      : await getInitData({params, query});

    const nextContext = {
      initData,
      ...context
    }

    return {
      context: nextContext,
      component: render(initData, context)
    }
  }
}

const routes = {
  path: '/',
  children: [
    {
      path: '/',
      module: ficoPage({
        getInitData,
        render(initData, {params}) {
          return <div>Home, {initData}</div>
        }
      }),
    },
    {
      path: '/test/:id',
      module: async function(context, params) {
        return {
          component: <div>test: {params.id}</div>,
        };
      },
    },
    {
      path: '/links',
      module: async function(context, params) {
        return {
          component: <HomePage {...context}/>,
        };
      },
    },
  ]
}
//
// export const routeConfig = {
//   '/(home)?': homePage,
//   '/test/:id': {
//     fetchData: props=>{
//       return async(props.router.params.id).then((id) => {
//         return {...props, user: id};
//       })
//     },
//     render(props) {
//       return <div>Hello: {props.user} !</div>;
//     },
//   },
//   '*': {
//     render() {
//       return <div>404 not found</div>;
//     },
//   },
// };

export default routes;
