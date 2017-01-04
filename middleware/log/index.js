/*
 * @Author: enzo
 * @Date:   2016-11-30 11:08:34
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-27 10:38:38
 */

const winston = require('winston');
const path = require('path');
const env = process.env['NODE_ENV'];

/**
 * 错误处理
 */
module.exports = function(setting) {

    let { path, statusConf } = setting;

    if (!path) {
        throw new Error(`log path config is null`);
    }

    winston.add(winston.transports.File, {
        filename: path
    });

    return function(ctx, next) {
        return next()
            .then()
            .catch(err => {
                if (env == 'develop') {
                    console.log(err);
                }

                const { status } = err;

                if (status) {
                    let lv = statusConf[status] || 'error';
                    winston[lv](err.name + '\n' + err.message + '\n' + err.stack);
                    return next()
                } else {
                    //系统错误
                    winston.error(err.name + '\n' + err.message + '\n' + err.stack);
                    ctx.body = err.stack;
                    ctx.status = 500;
                };
            })
    }
}