/*
* @Author: enzo
* @Date:   2016-11-30 11:08:34
* @Last Modified by:   slashhuang
* @Last Modified time: 2016-12-27 10:38:38
*/

const winston = require('winston');
const path = require('path');

/**
 * 404 or 500错误页面
 */
module.exports = function (){
    return function (ctx, next) {
        return next().then(()=>{
            global.logger.info('Hello again distributed logs');
            const status = ctx.status || 404;
            if (status === 404) {
                ctx.redirect('/');
                global.logger.error('404 page redirect to index page');
            }
        }).catch(err => {
            switch (err.status) {
                case 400:
                    break;
                case 500:
                    global.logger.error(err);
                    break;
                default:
                    ctx.status = 500;
                    global.logger.error(err);
                    break;
            }
            // ctx.render('404',{staticTag:404});
            ctx.body = err;
        })
    }
}