/*
* @Author: enzo
* @Date:   2016-11-16 16:17:22
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 18:59:54
*/

'use strict';

module.exports = {
    
    '_root': '/iwjw',

    '/': function(ctx, next){
        let data = [{
            name: '中远两玩城',
            cityID: '1234',
        }];

        ctx.body = JSON.stringify(data);
    }
}