/*
* @Author: enzo
* @Date:   2016-11-08 11:39:58
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-09 11:33:21
*/
const fs = require('fs');
const baseConfig = {

    // 应用端口
    port: 3000,

    app: {
        demo: 3000,
        demo2: 8000
    },

    // 日志文件地址
    logpath: '../../log/'
}

module.exports = function config(args) {

    let env = args.env || 'dev';
    let configFile = '../config/'+env + '.js';

  return Object.assign(baseConfig, fs.existsSync(configFile));
}