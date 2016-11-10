/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-10 18:31:26
*/

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');
const app = new koa();

const co = require('co');
const render = require('koa-ejs');

// render(app, {
//   root: path.join(__dirname, '../app/demo/pages'),
//   viewExt: 'html',
//   cache: false,
//   debug: false
// });

// app.context.render = co.wrap(app.context.render);


app.use(middleware.view({
  root:path.join(__dirname, '../app/demo/pages'),
  viewExt: 'html',
  cache: false,
  debug: true
}));

app.use(middleware.router());
app.use(middleware.body());



module.exports = app;
