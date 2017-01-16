/*
* @Author: zoucong
* @Date:   2017-01-16 14:18:56
* @Last Modified by:   zoucong
* @Last Modified time: 2017-01-16 19:54:12
*/

'use strict';

import ReactDOMServer from 'react-dom/server';
import React from 'react';

/**
 * [renderToString description]
 * @param  {[type]} dom    [description]
 * @return {[type]}        [description]
 */
export function renderToString(dom) {
  return ReactDOMServer.renderToString(dom);
}

/**
 * [render description]
 * @param  {[type]} Component [description]
 * @param  {Object} params    [description]
 * @param  {Object} config    [description]
 * @return {[type]}           [description]
 */
export function render(Component, params = {}, config = {}) {
  config = Object.assign({},defaultConfig,config);
  let string = renderToString(<Component {...params}/>);
  let _rootId = config.rootId;
  let _html = `<div id=${_rootId}>${string}</div>`;
  let _json = config.addProps ? JSON.stringify(params) : null;
  
  return {_html,_json};
}

const defaultConfig = {
  rootId:"react-root",
  addProps:true
};




