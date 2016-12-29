/*
 * @Author: enzo
 * @Date:   2016-11-30 11:08:34
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-27 10:38:38
 */

const winston = require('winston');
const path = require('path');

// winston.add(winston.transports.File, {
//     filename: ''
// });

/**
 * 错误处理
 */
module.exports = function(setting) {
    let { path, status } = setting;

    return function(ctx, next) {
        //将exception处理挂在global对象上
        global.throw = ctx.throw;
        return next()
            .then(() => {
                const status = ctx.status;
                if (status === 404) {
                    winston.warn('request Path is ', ctx.url, '404 page redirect');
                }
            })
            .catch(err => {
                console.log(err);
                // 处理400、500等未捕获的错误
                let { status } = err;
                if (status === 404) {
                    winston.warn('request Path is ', ctx.url, '404 page redirect');
                    // global.logger.warn('request Path is ',ctx.url,'404 page redirect => path "/"');
                    // ctx.status = 404;
                    // ctx.redirect('/');
                } else {
                    //未知错误
                    winston.error(err.name + '\n' + err.message + '\n' + err.stack);
                    ctx.body = err.stack;
                    ctx.status = 500;
                };
            })
    }
}