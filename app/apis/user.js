/*
 * @Author: enzo
 * @Date:   2016-11-10 10:20:28
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2017-3-7 16:31:09
 */
import { successToJson, errorToJson } from '../response';
import { getUserInfo } from '../services/user.js';

const resourceName = 'user';
const describe = '用户';
const actions = [
    {
    title: 'get detail v1',
    url: '/detail/:id',
    version: 'v1',
    action: async function(ctx, next) {
        let { id } = ctx.request.query;
        return  await getUserInfo(id);
    }
},
{
    title: 'logout',
    url: '/logout.action',
    action: async function(ctx, next) {
        ctx.set('Set-Cookie',["iwjw-session-id=0;Max-Age=0;Path=/"]);
        ctx.redirect('/')

    }
},
{
    title: 'login',
    url: '/login.action',
    action: async function(ctx, next) {
         ctx.cookie_decoder.batchCipher({
             "iwjw-session-id":'slash'
         },cookieArr=>ctx.set('Set-Cookie', cookieArr));
        ctx.redirect('/')
    }
}]


export { actions, resourceName, describe };