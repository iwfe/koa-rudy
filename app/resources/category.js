/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */

module.exports = [{
        title: 'get detail v1',
        url: '/:id',
        version: 'v1',
        action: async function(ctx, next) {
            await ctx.render('index', {
                title: 'koa-rudy'
            });
        }
    },

    {
        title: 'get detail v2',
        doc: '',
        method: 'get',
        url: '/:id',
        version: 'v2',
        action: async function(ctx, next) {
            await ctx.render('index', {
                title: 'koa-rudy'
            });
        }
    },
]