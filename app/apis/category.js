/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */

const resourceName = 'category'
const describe = '产品分类'
const actions = [{
        title: 'get detail v1',
        url: '/:id',
        version: 'v1',
        action: async function(ctx, next) {

        }
    },

    {
        title: 'get detail v2',
        doc: '',
        method: 'get',
        version: 'v2',
        url: '/:id',
        action: async function(ctx, next) {

        }
    }
]


export { actions, resourceName, describe };

// module.exports = {
//     resourceName: 'category',
//     describe: '产品分类',
//     actions:
// }