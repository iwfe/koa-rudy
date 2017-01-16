/*
 * @Author: enzo
 * @Date:   2016-11-08 11:40:08
 * @Last Modified by:   zoucong
 * @Last Modified time: 2017-01-16 18:50:17
 */
import { successToView } from './response';
import serverRender from './serverRender';

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
});

/**
 * react page test
 */

router.get('/react-page',async(ctx, next) => {
    let Page = require('./jsx/hello.jsx');
    serverRender(ctx, {
        title: 'react test',
        staticTag: 'react-test'
    }, {
        Page,
        props: {name: 'koa'}
    });
});

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