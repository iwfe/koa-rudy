/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */
import { successToJson, errorToJson } from '../response';
import { getSubject } from '../services/movie.js';

const resourceName = 'subject';
const describe = '主题';
const actions = [{
        title: 'get subject',
        url: '/:id',
        version: 'v1',
        action: async function(ctx, next) {
            let { id } = ctx.params;
            return getSubject(id);
        }
    },

    {
        title: 'get subject v2',
        version: 'v2',
        url: '/:id',
        action: async function(ctx, next) {
            return { version: 'v2' }
        }
    }
]


export { actions, resourceName, describe };