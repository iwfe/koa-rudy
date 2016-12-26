/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */

module.exports = {
    '/': async function(ctx, next) {
        await ctx.render('index', {
            title: 'koa-rudy'
        });
    },

    'get:/list': function(ctx, next) {
        ctx.body = ctx.params.id;
    },

    'get:/:id': function(ctx, next) {

    },

    'del:/:id': function(ctx, next) {

    }
}