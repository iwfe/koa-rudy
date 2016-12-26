/*
 * @Author: enzo
 * @Date:   2016-11-08 11:31:06
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-10 17:47:39
 */

const debug = require('debug')('rudy:server');

let config = global._rudyConfig = require('./config')(process.env.NODE_ENV);
let app = require('./app');

let server = require('http').createServer(app.callback());

console.log('启动端口' + config.port);

server.listen(config.port);