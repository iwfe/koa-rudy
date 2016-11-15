/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-14 22:20:59
*/

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');

import webpack from 'webpack';
import webpackConfig from './webpack.config';


//import webpackDevMiddleware from 'webpack-dev-middleware';
//import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';

import {demo} from '../app/demo';

const app = new koa();


const compiler = webpack(webpackConfig);

app.use(middleware.devMiddleware(compiler, { 
    noInfo: true, 
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(demo());

app.use(middleware.assstatic('.'));

app.use(middleware.view({
  root:path.join(__dirname, '../app/demo/pages')
}));

app.use(middleware.router());
app.use(middleware.body());


module.exports = app;
