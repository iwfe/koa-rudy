/**
 * built by slashhuang
 * 主程序入口
 * 16.12.23
 */

require("babel-register");

const debug = require('debug')('rudy:server');
/**
 * 切换不同的开发环境
 */
let config =  require('./config/conf.js')(process.env['NODE_ENV']);
global._appConfig = config;
global.logger = config['logger'];

let app = require('./bin/app');

let server = require('http').createServer(app.callback());

console.log('启动端口'+config.port);

server.listen(config.port); 