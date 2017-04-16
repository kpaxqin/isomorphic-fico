React start project
=======

[![Build Status](https://travis-ci.org/kpaxqin/react-starter-project.svg?branch=master)](https://travis-ci.org/kpaxqin/react-starter-project)
[![Coverage Status](https://coveralls.io/repos/github/kpaxqin/react-starter-project/badge.svg?branch=master)](https://coveralls.io/github/kpaxqin/react-starter-project?branch=master)


Try to show you how to build a REAL project with `React + Redux` by cover Following things:

* Basic Architecture.
* Route, navigator and breadcrumb
* Form and validation(sync & async)
* List view with pagination
* Modal: render in context, but isolate the open state.
* Error handling: setup a default way to handle error like response failure, also allow you to customize the behaviour for some special case.
* Loading, just like error handling, it's another type of `aspect` in front-end. we want to use it everywhere with out duplicated code, and the flexibility to by-pass or customize it.
* Map: integrate with non-react lib.
* Auth: control the render of component by user's authority
* CI: lint -> unit test -> e2e test


## How to run it ?
Run `npm start` for dev and `npm run build` for production bundle

## Basic Architecture
`react + redux + react-router` to build our application.

## Directory Structure
* `src`: source code directory
  * `.jsx`: a react component, should 
  * `.scss`: style of a react component
  * `.js`: plain js, services, values and etc
  * `__tests__`: UT code directory
    * `.specs.js(x)`: ut of a component or a service
* `test`: UT fixture directory. UT codes in src directory which are end with `.specs.js(x)`
* `mock`: mock server directory
* `webpack`: webpack configurations directory 
* `_dist`: build directory
* `coverage`: UT coverage report directory
