/*
* @Author: enzo
* @Date:   2016-11-08 15:08:35
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-15 10:22:40
*/


/**
 * 对body进行转义,使用时不需要再进行转义
 * 依赖于 co-body 
 * jsonTypes
 * formTypes
 * textTypes
 */

exports.body = require('./body');



/**
 * [路由收集器]
 * @type {[type]}
 */

exports.router = require('./router');


/**
 * [ejs view render]
 * @type {[type]}
 */

exports.view = require('./view');


/**
 * [static send]
 * @type {[type]}
 */

exports.assstatic = require('./static');




exports.devMiddleware = require('./webpack/devMiddleware.js');



exports.hotMiddleware = require('./webpack/hotMiddleware.js');


