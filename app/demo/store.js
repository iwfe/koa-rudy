/*
* @Author: enzo
* @Date:   2016-11-15 15:46:21
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 19:04:11
*/


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

console.log(rootReducer);

// 中间件处理
const middlewareBuilder = () => {

  //return [applyMiddleware[thunk,promiseMiddleware]];
  //
  let middleware = {};
  let universalMiddleware = [thunk,promiseMiddleware];
  let allComposeElements = [];

    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
          middleware
        ]

    return allComposeElements;
}

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}