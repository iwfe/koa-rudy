/*
* @Author: enzo
* @Date:   2016-11-16 16:46:17
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 17:02:24
*/

module.exports = {
    
    '_root': '/iwjw',

    '/': function(ctx, next){
        let data = {
            name: 'enzo',
            age: '18'
        }

        ctx.body = JSON.stringify(data);
    }
}