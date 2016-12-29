/*
 * @Author: enzo
 * @Date:   2016-11-08 11:40:08
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 19:56:09
 * 
 * 提示：整个项目的展开都围绕着中间件
 */

const debug = require('debug')('rudy:app');
const koa = require('koa');
const middleware = require('../middleware');
const path = require('path');
const router = require('../app/router.js');

const app = new koa();

/**
 * logger
 *
 */

app.use(middleware.log({
    path: '文件路径',
    status: '状态管理'
}));

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
    root: path.join(__dirname, '../app/views')
}));


// 页面
app.use(router.routes());

/**
 * 数据资源路由
 * 需要指定文件地址
 * @root http://127.0.0.1:3000/api/
 * @website api地址
 * @path 资源路径
 */
app.use(middleware.router({
    root: 'api',
    website: global._appConfig.website,
    path: path.join(__dirname, '../app/apis')
}));


/**
 * 处理数据
 */
app.use(middleware.body());


module.exports = app;