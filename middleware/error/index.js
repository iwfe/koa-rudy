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
        return next()
        .then(()=>{
            const status = ctx.status;
            console.log('-----',status);
            if (status === 404) {
                throw new Error('404 not found err',404);
            }else{
                console.log(status);
            }
        })
        .catch(err => {
            // 处理400、500等未捕获的错误
            if(err.status){
                global.logger.error(JSON.strinify(err,2,2));
                if (err.status === 404) {
                    global.logger.warn('404 page redirect to index page');
                    ctx.redirect('/');
                };
                console.log(err.status);
            }else{
                //未知错误
               global.logger.error(err.name + '\n' + err.message);
               ctx.app.emit('error', err, ctx);
               ctx.body = err.stack;
               ctx.status = 500;
            };
            
        })
    }
}