/*
 * @Author: enzo
 * @Date:   2016-12-28 16:38:35
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 18:01:59
 */

import request from "../request";

class User extends request {
    constructor() {
        super();

        this.host = global._appConfig.userSoa;

        this.actions = {
            'info': 'user.json'
        }
    }
}

const user = new User();

export  function getUserInfo(id) {
    return  user.customize_fetch({
        url: "info"
    })

    return data;
}