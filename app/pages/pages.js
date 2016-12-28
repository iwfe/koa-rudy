/*
 * @Author: enzo
 * @Date:   2016-11-08 11:40:08
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-29 17:25:55
 */

const router = require('koa-router')();


/**
 * index
 */
router.get('/', (ctx, next) => {
    ctx.render('index', {
        title: 'koa-rudy'
    });
})

/**
 * about
 */
router.get('/about', (ctx, next) => {
    ctx.render('about', {
        title: 'koa-rudy'
    });
})

/**
 * 404
 */
router.get('/404', (ctx, next) => {
    ctx.render('404', {
        title: 'koa-rudy'
    });
})

module.exports = router;