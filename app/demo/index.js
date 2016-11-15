/*
* @Author: enzo
* @Date:   2016-11-13 23:38:34
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-14 21:51:19
*/

'use strict';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import App from './components/App';

function handleRender(ctx, next) {
  // 创建新的 Redux store 实例
  const store = createStore(counterApp);

  // 把组件渲染成字符串
  const html = renderToString(
    <Provider store={store}>
      
    </Provider>
  )

  // 从 store 中获得初始 state
  const initialState = store.getState();

  // 把渲染后的页面内容发送给客户端
  res.send(renderFullPage(html, initialState));
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

export function demo(){
    return function(ctx, next){
        // 创建新的 Redux store 实例
          //const store = createStore(counterApp);

          // 把组件渲染成字符串
          const html = renderToString(
            <Provider>
                <App />
            </Provider>
          )

          // 从 store 中获得初始 state
          const initialState = {a:1};

          // 把渲染后的页面内容发送给客户端
          //res.send();
        ctx.body = renderFullPage(html, initialState);
    }
}
