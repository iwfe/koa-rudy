/*
 * @Author: enzo
 * @Date:   2016-11-30 11:08:34
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-27 10:38:38
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');
const dateUtils = require("date-utils").language("es");

const heartbeat = 1000 * 60;
const timeReg = 'YYYY-MM-DD';
var logTime = Date.now();

const error = function(msg = '这一个默认的错误msg', status = 500) {
    let err = new Error(msg);
    err.status = status;

    throw err;
}

const info = function(msg) {
    console.log(msg);
    winston.info(msg)
}

const logger = function(setting) {

    let { path } = setting;

    if (!path) {
        throw new Error(`log path is empty`);
    }

    winston.add(winston.transports.File, {
        filename: path
    });

    // 一分钟轮询一次
    // 每天生成历史日志文件
    setInterval(() => {
        let today = new Date().toFormat(timeReg);
        let last = new Date(logTime).toFormat(timeReg);

        if (new Date(today).getTime() > new Date(last).getTime()) {
            let rename = path.replace('.log', `.${last}.log`);
            fs.rename(path, rename, () => {
                fs.writeFile(path, 'UTF-8');
                logTime = Date.now();
            });
        }

    }, heartbeat)


    return function(ctx, next) {
        return next()
            .then()
            .catch(err => {
                winston.error(err.name + '\n' + err.message + '\n' + err.stack);
            })
    }
}

export { logger, info, error }