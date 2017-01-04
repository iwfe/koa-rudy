/**
 * built by slashhuang
 * 主程序入口
 * 16.12.23
 */
require("babel-register");

const debug = require('debug')('rudy:server');

// 获取配置文件
const config = require('./config/index.js')(process.env['NODE_ENV']);

// 挂载全局配置
global._appConfig = config;

// 抛出日志
// 开发者只需要将 mes 和 status 抛出
// 我们在 log 中间件中进行捕获
// 根据 status 进行相应的操作，决定是否 info 还是 Error
// status.config 对status进行等级配置
global._throw = function(msg = '这一个默认的错误msg', status = 500) {
    let err = new Error(msg);
    err.status = status;

    throw err;
};

const app = require('./bin/app');
const server = require('http').createServer(app.callback());

server.listen(config.port);

console.log('启动端口' + config.port);