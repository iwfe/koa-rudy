/*
* @Author: enzo
* @Date:   2016-11-08 11:39:58
* @Last Modified by:   slashhuang
* @Last Modified time: 2016-12-26 15:29:34
*/
const baseConfig = {

    // 应用端口
    port: 3000,
    
    // 测试端口
    testPort: 3001,

    // 接口超时时间
    timeout: 5000
};
const logger = require('./logs/conf.js');

module.exports = function config(env) {

    env = env || 'dev';

    let configFile = require('./'+env + '.js');

    return Object.assign(baseConfig, configFile,{logger:new logger().logger});
};