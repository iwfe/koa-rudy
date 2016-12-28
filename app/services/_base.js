/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:27
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-12-28 18:09:04
 */

import axios from "axios";
import path from "path";
import querystring from 'querystring';

/**
 * 请求数据配置
 */
const requestInstance = axios.create({
    timeout: 5000
});

requestInstance.interceptors.response.use(function(response) {
    // Do something with response data
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

export default class BaseHttp {

    constructor() {

        // soa 从 global._appconfig 获取
        this.host = '';
    }

    /**
     * 基本的请求数据结构
     * @param data
     * @returns {*}
     * {data: {},
     * status,
     * statusText
     * headers
     * config
     * }
     */
    async fetch(data) {
        const param = {
            method: data.method || 'get',
            url: this.host + data.url,
            data: data.params
        };
        return await requestInstance(param)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                global.throw('SOA请求出错', 500);
            });
    }
}