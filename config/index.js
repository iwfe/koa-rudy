/*
 * @Author: enzo
 * @Date:   2016-11-08 11:39:58
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 17:38:25
 */
const baseConfig = {

    // 应用端口
    port: 3000,

    // 测试端口
    testPort: 3001,

    // 接口超时时间
    timeout: 5000,

    // api site
    website: 'http://127.0.0.1:3000',
};


module.exports = function config(env) {

    env = env || 'develop';

    let configFile = require('./' + env + 'config.js');

    return Object.assign(baseConfig, configFile);
};