import React, { PropTypes } from 'react';
import _ from 'lodash';

import TestPage from './home/pages/Test';

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

const routes = {
  path: '/',
  children: [
    {
      path: '/',
      module: async ()=> {
        return import(/*  webpackChunkName: "home"  */ './home/pages/Home')
      },
    },
    {
      path: '/test/:id',
      module: TestPage,
    },
    {
      path: '/links',
      module: async function(context, params) {
        return {
          component: <HomePage {...context}/>,
        };
      },
    },
    {
      path: '*',
      module: async function() {
        return {
          component: <div>Not found</div>
        }
      }
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

function createUI({
  updates = {
    INIT(props) { // no async here
      return props.init || 3;
    },
    add(props, state) {
      return state + props;
    },
  },
  handlers = {
    onInc(e, props) {
      
    }
  },
  view = function Test({state, handlers}) {
    return <div>
      {state}
      <button onClick={handlers.onInc}>Inc</button>  
    </div>
  },
}) {
  const name = view.name;

  class UI extends React.Component {
    constructor(props) {
      super();
      this.state = updates.INIT(props);
      this.updates = Object.keys(updates).reduce((acc, key) => {
        acc[key] = ()=> {
          const fn = updates[key];
          this.setState((state)=> fn(this.props, state));
        }
        return acc;
      }, {})
    }
    render() {
      return view(this.state, this.updates)
    }
  }
  

  return UI;
}