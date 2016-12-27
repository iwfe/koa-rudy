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
            if (status === 404) {
                ctx.throw('404 page',404,dd)
            }
        })
        .catch(err => {
            // 处理400、500等未捕获的错误
            let { status }= err;
            if(status){
                if (status === 404) {
                    global.logger.warn('request Path is ',ctx.url,'404 page redirect => path "/"');
                    ctx.status = 404;
                    ctx.redirect('/');
                }else{
                    global.logger.error(JSON.stringify(err,2,2));
                }
            }else{
                //未知错误
               global.logger.error(err.name + '\n' +err.message+'\n'+ err.stack);
               ctx.body = err.stack;
               ctx.status = 500;
            };   
        })
    }
}