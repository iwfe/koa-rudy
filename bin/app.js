/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-10 11:03:03
*/

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');


const app = new koa();

var router = require('koa-router')();

router.get('/home', function (ctx, next) {
    ctx.body = 'Hello World!';
})

app.use(router.routes());

app.use(middleware.router());
app.use(middleware.body());
//app.use(middleware.view());

// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

module.exports = app;
