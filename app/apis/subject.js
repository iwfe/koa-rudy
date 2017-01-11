/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */
import { successToJson } from '../response';
import { getSubject } from '../services/movie.js';

const resourceName = 'subject';
const describe = '主题';
const actions = [{
        title: 'get subject',
        url: '/:id',
        version: 'v1',
        action: async function(ctx, next) {
            let { id } = ctx.request.query;

            if (!id) {
                return errorToJosn(ctx, '缺少必要字段');
            }

            let data = await getSubject(id);

            if (data == null) {
                return errorToJosn(ctx, '未找到该主题', 404);
            } else {
                return successToJson(ctx, data)
            }
        }
    },

    {
        title: 'get subject v2',
        version: 'v2',
        url: '/:id',
        action: async function(ctx, next) {
            successToJson(ctx, { version: 'v2' });
        }
    }
]


export { actions, resourceName, describe };