/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:27
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-26 15:18:47
 */

import winston from "winston";
import axios from "axios";
import path from "path";
import copy from "copy-to";
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
        let param = {
            method: data.method || 'get',
            url: this.host + data.url,
            data: data.params
        };
        return await requestInstance(param)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error)
            });
    }
    /**
     * 日志
     */
    log() {
        return winston;
    }
}