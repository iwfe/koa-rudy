/*
 * @Author: enzo
 * @Date:   2016-11-08 11:39:58
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-29 15:29:34
 */

const fs = require('fs');
const path = require('path');

const baseConfig = {

    // 应用端口
    port: 3000,

    // 测试端口
    testPort: 3001,

    // 接口超时时间
    timeout: 5000,

    website: 'http://127.0.0.1:3000',

    // 错误日志文件
    errorLog: 'error-logs.log',

    // info日志文件
    infoLog: 'info-logs.log'
}

module.exports = function config(env) {

    env = env || 'develop';

    let configFile = require('../config/' + env + '.config.json');

    return Object.assign(baseConfig, configFile);
}