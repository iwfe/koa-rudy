/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-17 13:06:26
*/
require("babel-register");

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');
const winston = require('winston');

winston.add(winston.transports.File, { 
    filename: path.join(__dirname, '../log/all-logs.log')
});

winston.error('Hello again distributed logs');
winston.log('debug', 'Now my debug messages are written to console!');

const app = new koa();

app.use(middleware.assstatic('.'));

app.use(middleware.view({
  root:path.join(__dirname, '../app/demo/pages')
}));

app.use(middleware.router(path.join(__dirname, '../app/demo/controller')));
app.use(middleware.body());


module.exports = app;
