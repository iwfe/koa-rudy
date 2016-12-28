/**
 * Created by huangxiaogang on 16/12/26.
 * 首页提供的服务
 */

import BaseHttp from './_base.js';
class GithubTest extends BaseHttp {
    constructor() {
        super();
        this.host = 'https://api.github.com'
    }
}
let TestInstance = new GithubTest();

export async function getIndexInfo() {
    global.throw('405 page',400)
    return await TestInstance.fetch({
        url:'/orgs/iwfe'
    }).then(function(data) {
        return data;
    }, function(error) {
        console.log('出错了', error);
    })
}