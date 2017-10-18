import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from '../../lib/router';
import './test.less';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    }
  }
  onInc= ()=> {
    this.setState({
      count: this.state.count + 1
    });
  };
  onDec= () => {
    this.setState({
      count: this.state.count - 1
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onDec}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.onInc}>+</button>
      </div>
    )
  }
}

function async(value) {
  return new Promise(function (res) {
    setTimeout(() => {res(value)}, 3000);
  })
}

function getRandomInt() {
  return parseInt(Math.random() * 100 /10)
}

const root = typeof window !== 'undefined' ? window : global;

function isBrowser() {
  return !!(root.document && root.navigator);
}

function dataProvider(dataLoader) {
  const isInBrowser = isBrowser();
  return props=> {
    if (isInBrowser && _.get(window, '__FICO_STATE__.data')) {
      console.log('provider in browser first render');
      const data = window.__FICO_STATE__.data;
      window.__FICO_STATE__.data = undefined;
      return Promise.resolve({...props, data});
    }

    console.log('provider perform async');
    return Promise.resolve(dataLoader(props)).then((data) => {
      return {
        ...props,
        data
      }
    })
  }
}

export default {
  getInitData: function() {
    return async(getRandomInt()).then(value=> {
      console.log('get init');
      return {count: value};
    })
  },
  render({initData}) {
    return (
      <div className="test_kpaxqin">
        root test kpaxqin_is_testing
        <p>
          <Link to="/page_not_found">404</Link>
        </p>
        <Counter count={initData.count}/>
      </div>
    );
  }
}
