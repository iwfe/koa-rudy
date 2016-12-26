/*
* @Author: enzo
* @Date:   2016-11-08 11:40:08
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-29 17:25:55
* 整个项目的展开都围绕着中间件
*/
require("babel-register");

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');

const app = new koa();

/**
 * 处理错误
 *
 * 全局处理，各层的错误全部抛出由该中间件捕获
 * 带状态码 util.throw('Error Message', 500);
 * 普通错误 throw new Error('Error Message');
 */

app.use(middleware.error());


/**
 * 处理静态文件
 * 
 * 参数为root路径
 */
app.use(middleware.assstatic('.'));


/**
 * 处理render
 * @type {[type]}
 */
app.use(middleware.view({
  root:path.join(__dirname, '../app/views')
}));

/**
 * 处理路由
 * 需要指定文件地址
 */

app.use(middleware.router(path.join(__dirname, '../app/controller')));

/**
 * 处理数据
 */
app.use(middleware.body());


module.exports = app;
