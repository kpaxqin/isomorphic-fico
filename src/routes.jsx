import React, { PropTypes } from 'react';
import homePage from './home/pages/Home';

function async(value) {
  return new Promise(function (res) {
    console.log('Performing async');
    setTimeout(() => {res(value)}, 3000);
  })
}

const routes = {
  path: '/',
  children: [
    {
      path: '/',
      module: async function(context, params) {
        return {
          component: <div>Home</div>,
        };
      },
    },
    {
      path: '/test/:id',
      module: async function(context, params) {
        return {
          component: <div>Test: {params.id}</div>,
        };
      },
    }
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
