/*
* @Author: enzo
* @Date:   2016-11-10 11:22:41
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 16:01:36
*/

module.exports = {
    
    '_root': '/api',

    '/': function(ctx, next){
        ctx.body = 'home1';
    }
}


