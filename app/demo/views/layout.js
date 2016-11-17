/*
* @Author: enzo
* @Date:   2016-11-15 11:40:16
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 20:01:39
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

            const store = configureStore({});

            console.log(renderProps.components.propTypes);
            console.log(456);

            //renderProps.components.propTypes.WrappedComponent();

            const html = renderToString(
              <Provider store={store}>
                  <RouterContext {...renderProps} />
              </Provider>
            );
                    
            ctx.status = 200;
            ctx.body = fullPage(html, store.getState(), ctx.url);

            // util.fetchComponent(store.dispatch, renderProps.components, renderProps.params)
            //       .then(() => {
        });

        return await next()
    }
}
