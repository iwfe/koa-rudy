/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 15:56:43
*/

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');

import webpack from 'webpack';
import webpackConfig from '../app/webpack.config';
import layoutView from '../app/demo/views/layout.js';

const app = new koa();

const compiler = webpack(webpackConfig);

app.use(middleware.devMiddleware(compiler, { 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    noInfo: true,
    quiet: false,
    devtool: 'source-map',
    publicPath: webpackConfig.output.publicPath
}));

//app.use(demo());
app.use(layoutView());

app.use(middleware.assstatic('.'));

app.use(middleware.view({
    layout: '',
    root: path.join(__dirname, '../app/demo/views')
}));

app.use(middleware.router(path.join(__dirname, '../app/demo/service')));
app.use(middleware.body());

module.exports = app;