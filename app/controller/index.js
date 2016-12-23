/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-23 16:49:05
*/

//import * as BaseControl from "./_base.js";
//let {successTOpage} = BaseControl;
import { successToPage } from './_base.js';

module.exports = {
    
    '/': async function(ctx, next){
        successToPage(ctx, 'index', {
            title: 'koa-rudy'
        });
    }
}





