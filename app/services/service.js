/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:27
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-29 17:18:47
 */

import winston from "winston";
import axios from "axios";
import path from "path";
import copy from "copy-to";
import querystring from 'querystring';

/**
 * 请求数据配置
 */

const instance = axios.create({
    timeout: global._rudyConfig.timeout
});

export default class Base {

    constructor() {

        // soa 从 global._appconfig 获取
        this.host = '';

        // soa api list
        this.actions = {};
    }

    /**
     * [request description]
     * @return null
     */
    request(param = {}) {
        param.data = querystring.stringify(param.data);
        return instance(param);
    }

    /**
     * data的结构
     * {
     *      url:{ 
     *          action:"",
     *          data:{}
     *      },  或 ""
     *      data:{}
     *      method:"post"
     * }
     */
    async fetch(data) {
        let rep = null;
        let tempUrl = data.url && this.actions[data.url];
        let paramData, url;
        if (typeof tempUrl === "object") {
            url = tempUrl.action;
            paramData = Object.assign(tempUrl.data, data.data);
        } else {
            url = tempUrl;
            paramData = data.data || {};
        }
        let param = {
                method: data.method || 'post',
                url: this.host + url,
                data: paramData
            }
            // param.data = copy(param.data).to((data && data.data) || {});

        return await this.request(param).then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    /**
     * [log description]
     * @return {[Object]} [description]
     */
    log() {
        return winston;
    }
}