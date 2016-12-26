/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-23 16:49:05
*/

import { successToPage } from './_base.js';

module.exports = {
    
    'get:/hello': async function(ctx, next){
        successToPage(ctx, 'index', {
            title: 'koa-rudy'
        });
    },
    '/another': async function(ctx, next) {
        successToPage(ctx, 'another', {
            title: 'fuck you'
        });
    }
};





