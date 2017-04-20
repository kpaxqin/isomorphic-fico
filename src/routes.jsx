import React, { PropTypes } from 'react';
import homePage from './home/pages/Home';

function async(value) {
  return new Promise(function (res) {
    console.log('Performing async');
    setTimeout(() => {res(value)}, 3000);
  })
}

export const routeConfig = {
  '/(home)?': homePage,
  '/test/:id': {
    providers: [props=>{
      return async(props.router.params.id).then((id) => {
        return {...props, user: id};
      })
    }],
    render(props) {
      return <div>Hello: {props.user} !</div>;
    },
  },
  '/test': require("./home/pages/Test"),
  '/redirect': {
    render(props) {
      //redirect can be performed either in render function or provider function.
      props.router.history.replace('/test');
    }
  },
  '*': {
    render() {
      return <div>404 not found</div>;
    },
  },
};

export default routeConfig;
