/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-11 15:27:18
*/

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');

const app = new koa();

app.use(middleware.assstatic('.'));

app.use(middleware.view({
  root:path.join(__dirname, '../app/demo/pages')
}));

app.use(middleware.router());
app.use(middleware.body());


module.exports = app;
