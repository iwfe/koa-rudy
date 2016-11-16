/*
* @Author: enzo
* @Date:   2016-11-15 11:40:16
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 10:58:30
*/

'use strict';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';

import Hello from './components/hello';

const util = require('../../assets/util');

const renderFullPage = function (html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>
  `;
}

export default function (){

    return async function(ctx, next){
        if (ctx.url.indexOf('ico') > -1) {
          return next();
        }

        await match({ routes, location: ctx.url }, (err, redirectLocation, renderProps) => {

            if (err) {
                console.error(err);
                res.status = 500;
                res.body = `Internal Server Error ${err}`;
            }

            if (!renderProps || redirectLocation) {
                return;
            }

            // if (redirectLocation) {
            //     ctx.redirect(redirectLocation.pathname + redirectLocation.search);
            // }

            const store = configureStore({list:[1,2]});

            util.fetchComponent(store.dispatch, renderProps.components, renderProps.params)
                  .then(() => {

                    const html = renderToString(
                      <Provider store={store}>
                          <RoutingContext {...renderProps} />
                      </Provider>
                    );

                    // <RoutingContext {...renderProps} />
                    
                    ctx.status = 200;
                    ctx.body = renderFullPage(html, store.getState());
                  })
                  .catch(err => {
                    console.log(err)
                    ctx.body = renderFullPage("",{});
                  });
           
        });

        return next()
    }
}
