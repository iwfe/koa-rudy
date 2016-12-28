/*
 * @Author: enzo
 * @Date:   2016-11-08 11:40:08
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-29 17:25:55
 */

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');
const pages = require('../app/index');

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
 * 处理静态文件路由
 */
app.use(middleware.assstatic('.'));


/**
 * 页面render
 * @path 指定页面路径
 */
app.use(middleware.view({
    path: path.join(__dirname, '../app/views')
}));


// 页面
app.use(pages.routes());

/**
 * 数据资源路由
 * 需要指定文件地址
 * @root http://127.0.0.1:3000/api/
 * @website api地址
 * @path 资源路径
 */
app.use(middleware.resources({
    root: 'api',
    website: global._rudyConfig.website,
    path: path.join(__dirname, '../app/resources')
}));


/**
 * form 表单数据处理
 */
app.use(middleware.body());

module.exports = app;