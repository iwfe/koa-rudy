/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   slashhuang
* @Last Modified time: 2016-12-26 11:49:05
*/

import { successToPage } from './_base.js';
import { getIndexInfo } from '../service/index';
module.exports = {
    'get:/': async function(ctx, next){
        successToPage(ctx, 'welcome', {
            title: '首页',
            staticTag:'welcome'
        });
    },
    'get:/github': async function(ctx, next){
        let gitData = await getIndexInfo();
        successToPage(ctx, 'index', Object.assign({
            title: 'github展示',
            staticTag:'index'
        },gitData));
    },
    '/another/:test': async function(ctx, next) {
        successToPage(ctx, 'another', {
            title: '另一个接口',
            staticTag:'another',
            data:ctx.params.test
        });
    }
};





