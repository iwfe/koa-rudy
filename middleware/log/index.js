/*
 * @Author: enzo
 * @Date:   2016-11-30 11:08:34
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-27 10:38:38
 */

const winston = require('winston');
const path = require('path');
const env = process.env['NODE_ENV'];

global.error = function(msg = '这一个默认的错误msg', status = 500) {
    let err = new Error(msg);
    err.status = status;

    throw err;
}

global.log = function(msg) {
    msg = new Date() + msg;

    if (env == 'dev') {
        console.log(msg);
    }
    winston.info(msg)
}

/**
 * 错误处理
 */
module.exports = function(setting) {

    let { path } = setting;

    if (!path) {
        throw new Error(`log path config is empty`);
    }

    winston.add(winston.transports.File, {
        filename: path
    });

    return function(ctx, next) {
        return next()
            .then()
            .catch(err => {
                const { status } = err;

                winston.error(new Date() + err.name + '\n' + err.message + '\n' + err.stack);

                // 将错误返回客户端
                if (!status || (status && status == 500)) {
                    ctx.body = err.stack;
                    ctx.status = 500;
                };
            })
    }
}