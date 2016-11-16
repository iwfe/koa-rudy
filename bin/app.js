/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 11:08:32
*/

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');

import webpack from 'webpack';
import webpackConfig from '../app/webpack.config';
import demoapp from '../app/demo/app.js';


const app = new koa();

// const compiler = webpack(webpackConfig);


// app.use(middleware.devMiddleware(compiler, { 
//     publicPath: webpackConfig.output.publicPath
// }));

//app.use(demo());
//app.use(demoapp());


app.use(middleware.assstatic('.'));

app.use(middleware.view({
  root:path.join(__dirname, '../app/demo/pages')
}));

app.use(middleware.router());

app.use(middleware.body());


module.exports = app;
