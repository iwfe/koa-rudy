/*
* @Author: enzo
* @Date:   2016-11-30 11:08:34
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-30 11:08:38
*/

const winston = require('winston');
const path = require('path');
const logPath = global._appConfig.errorLog;

// 日志文件配置
winston.add(winston.transports.File, { 
    filename: path.join(__dirname, `../../logs/${logPath}`)
});

/**
 * 404 or 500错误页面
 */
module.exports = function (){
    return function (ctx, next) {
        return next().then(()=>{
            const status = ctx.status || 404;
            if (status === 404) {
                ctx.redirect('/')
                winston.error('404 page redirect to index page');
            }
        }).catch(err => {
            switch (err.status) {
                case 400:
                    break;
                case 500:
                    winston.error(err);
                    break;
                default:
                    ctx.status = 500;
                    console.log(err)
                    break;
            }
            // ctx.render('404',{staticTag:404});
            ctx.body = err;
        })
    }
}