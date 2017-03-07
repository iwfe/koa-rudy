/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 16:31:09
 */
import { successToJson } from '../response';
import { getTag } from '../services/movie.js';

const resourceName = 'tag';
const describe = '分类';
const actions = [{
    title: 'get tag',
    url: '/',
    action: async function(ctx, next) {
        return await getTag();
    }
}]


export { actions, resourceName, describe };