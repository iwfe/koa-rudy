/*
* @Author: enzo
* @Date:   2016-11-08 11:31:06
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-08 19:06:22
*/

const debug = require('debug')('rudy:server');

let args = require('../assets/util').parseArg();
let config = global._rudyConfig = require('./config')(args);
let app = require('./app');
let server = require('http').createServer(app.callback());

console.log('启动端口'+config.port);

server.listen(config.port); 