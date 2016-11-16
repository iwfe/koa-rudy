/*
* @Author: enzo
* @Date:   2016-11-15 15:46:21
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 15:29:26
*/


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

// 中间件处理
const middlewareBuilder = () => {
    
    let universalMiddleware = [thunk,promiseMiddleware];
    return [applyMiddleware(...universalMiddleware)];
}

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store;
}