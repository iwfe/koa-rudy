/*
* @Author: enzo
* @Date:   2016-11-10 10:20:28
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-10 10:21:39
*/


module.exports = {
    '/': function(ctx, next){
        ctx.body = 'index';
    },

    'get:/:id': function (ctx){
        ctx.body = 'id';
    },

    'del:/:id': function (){
        
    },

    'post:/user/:id': function (){
        
    }
}