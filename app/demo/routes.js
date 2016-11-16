/*
* @Author: enzo
* @Date:   2016-11-13 14:22:28
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 19:26:59
*/

import React from 'react';
import App from './components/app';
import Hello from './components/hello';
import { Route } from 'react-router';

const routes = (
  <Route name="app" path="/" component={App} >
    <Route path="list" component={Hello} />
  </Route>
);

export default routes;