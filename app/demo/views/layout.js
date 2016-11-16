/*
* @Author: enzo
* @Date:   2016-11-15 11:40:16
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 15:05:15
*/

'use strict';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';
import configureStore from '../store';
import fullPage from './fullpage';

const util = require('../../../assets/util');

export default function (){

    return async function(ctx, next){
        if (ctx.url.indexOf('ico') > -1) {
          return await next();
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

            const store = configureStore();

            util.fetchComponent(store.dispatch, renderProps.components, renderProps.params)
                  .then(() => {

                    const html = renderToString(
                      <Provider store={store}>
                          <RouterContext {...renderProps} />
                      </Provider>
                    );
                    
                    ctx.status = 200;
                    ctx.body = fullPage(html, store.getState(), ctx.url);
                  })
                  .catch(err => {
                    console.log(err)
                    ctx.body = fullPage("",{},ctx.url);
                  });
           
        });

        return await next()
    }
}
