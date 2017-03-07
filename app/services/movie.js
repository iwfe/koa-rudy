/*
 * @Author: enzo
 * @Date:   2016-12-28 16:38:35
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 18:01:59
 */

import request from "../request";

class Subject extends request {
    constructor() {
        super();
        this.host = global._appConfig.movieSoa;
        this.actions = {
            'subject': 'subject.json',
            'tag': 'tag.json'
        }
    }
}

const subject = new Subject();

export function getSubject(id) {
    return subject.customize_fetch({
        url: "subject"
    })
}

export function getTag(id) {
    return subject.customize_fetch({
        url: "tag"
    })
}