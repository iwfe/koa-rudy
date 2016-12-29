/*
 * @Author: enzo
 * @Date:   2016-11-08 11:40:08
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 19:59:04
 */
import { successToView } from './response';

const router = require('koa-router')();

/**
 * index
 */
router.get('/', (ctx, next) => {
    successToView(ctx, 'welcome', {
        title: '首页',
        staticTag: 'welcome'
    });
})

/**
 * about
 */
router.get('/github', async(ctx, next) => {
    let gitData = await getIndexInfo();

    successToView(ctx, 'about', Object.assign({
        title: 'github展示',
        staticTag: 'index'
    }, gitData));
})


/**
 * 404
 */
router.get('/404', (ctx, next) => {
    successToView(ctx, '404', Object.assign({
        title: 'github展示',
        staticTag: 'index'
    }, gitData));
})


router.get('/another/:test', (ctx, next) => {
    successToView(ctx, 'another', {
        title: '另一个接口',
        staticTag: 'another',
        data: ctx.params.test
    });
})


module.exports = router;