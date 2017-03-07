/*
 * SOA服务处理中间件
 * @author slashhuang
 * 2017/2/23
 */

/*修正request原型*/
module.exports = (ctx,next)=>{
    require('../../app/request.js').prototype.ctx = ctx;
    return next()
 }