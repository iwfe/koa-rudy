/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */
import { successToJson, errorToJson } from '../response';
import { getUserInfo } from '../services/user.js';

const resourceName = 'user';
const describe = '用户';
const actions = [{
    title: 'get detail v1',
    url: '/:id',
    version: 'v1',
    action: async function(ctx, next) {
        let { id } = ctx.request.query;
        return  await getUserInfo(id);
    }
}]


export { actions, resourceName, describe };