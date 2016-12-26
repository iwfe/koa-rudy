/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   slashhuang
* @Last Modified time: 2016-12-26 11:49:05
*/

import { successToPage } from './_base.js';

module.exports = {
    'get:/': async function(ctx, next){
        successToPage(ctx, 'index', {
            title: '首页'
        });
    },
    'get:/hello/:id': async function(ctx, next){
        successToPage(ctx, 'index', {
            title: 'koa-rudy'
        });
    },
    '/another/:test': async function(ctx, next) {
        successToPage(ctx, 'another', {
            title: 'fuck you',
            data:ctx.params.test
        });
    }
};





