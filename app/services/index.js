/**
 * Created by huangxiaogang on 16/12/26.
 * 首页提供的服务
 */

import Client from '../Client';
class GithubTest extends Client {
    constructor() {
        super();
        this.host = 'https://api.github.com'

        this.actions = {
            iefe: '/orgs/iwfe'
        }
    }
}
let TestInstance = new GithubTest();

export async function getIndexInfo() {
    global.throw('405 page', 400)
    return await TestInstance.fetch({
        url: 'iefe'
    }).then(function(data) {
        return data;
    }, function(error) {
        console.log('出错了', error);
    })
}