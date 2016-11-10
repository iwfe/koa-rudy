/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-10 18:28:12
*/


module.exports = {
    '/': async function(ctx, next){ 
        console.log(121212);
        await ctx.render('index');
    },

    'get:/:id': function (ctx,next){
        ctx.body = ctx.params.id;
    },

    'del:/:id': function (ctx,next){
        
    },

    'post:/:id': function (ctx,next){
        
    }
}