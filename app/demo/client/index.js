/*
* @Author: enzo
* @Date:   2016-11-14 23:09:20
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 18:57:00
*/

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import routes from '../routes';
import configureStore from '../store';

// `__INITIAL_STATE__` 来自服务器端渲染，下一部分细说
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const Root = (props) => {
  return (
    <div>
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          {routes}
        </Router>
      </Provider>
    </div>
  );
}

render(<Root />, document.getElementById('root'));