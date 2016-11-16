/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 15:25:19
*/


module.exports = {
    '/': async function(ctx, next){ 
        await ctx.render('about', {
            title: 'koa-rudy'
        });
    }
}





