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
    timeout: global._appConfig.timeout || 5000
});

requestInstance.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    global.throw('网络出错', 500);
    return Promise.reject(error);
});


export default class Client {

    constructor() {

        // soa 从 global._appConfig 获取
        this.host = '';
        // 封装api地址
        this.actions = {};
    }

    /**
     * 单独抽出request方法
     * 当子类覆盖fetch时调用该方法进行数据请求
     * @return null
     */
    request(param = {}) {
        return requestInstance(param);
    }

    /**
     * 序列化参数
     * this.serializeData(param)
     */
    serializeData(params) {
        return querystring.stringify(params.data || params);
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
        return await this.request(param)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                global.throw('SOA请求出错', 500);
            });
    }
}