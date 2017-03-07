/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:27
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2017-2-22 18:09:04
 */

import axios from "axios";
import path from "path";
import querystring from 'querystring';
/**
 * 请求数据配置
 */
const requestInstance = axios.create({
    timeout: global._appConfig.timeout || 10000
});

requestInstance.interceptors.response.use(function(response) {
    global.log_info('response data ----' + JSON.stringify(response.data));
    return response;
}, function(error) {
    global.log_error('err ------ ' +error.message+ error.stack);
    return Promise.reject({
        err:`请求出错 ${error.message}`,
        message:error.message
    });
});

module.exports =  class Client {

    constructor() {
        //租赁服务soa
        this.host ='';
        // 封装api地址
        this.actions = {};
    }
    request(param = {}) {
        return requestInstance(param);
    }
    /*测试常量*/
    getConst(options){
        //mixin options处理返回数据
        let { mock } = options
        return {
            //mock环境 并且提供数据
            mockBoolean:process.env['NODE_MOCK']=='mock' && mock,
            //mocha测试
            mochaBoolean:process.env['npm_config_argv'] && process.env['npm_config_argv'].match('mocha')
        }
    }
    /*请求数据模板*/
    beforeRequestData(data,options){
        let method = data.method;
        if( method=='post'){
            data.headers = {'Content-Type': 'application/json;charset=utf-8'}
        };
        let soaUrl = this.actions[data.url] ||  data.url;
        let args =  {
            method: method || 'get',
            url: `${data.host||this.host}${soaUrl}`,
            params: data.params,
            data: data.data
        };
        let finalArgs  = data[method=='post'?"data":"params"]||{};
         //加入请求数据凭证
        Object.assign(finalArgs,this.ctx.cookie_decoder.rawValues)
        if(!options.transDataFn){
            options.transDataFn = data=>data;
        }
       
        global.log_info('params data is -- ' + JSON.stringify(args));
        return args;
    }
    /*执行自行的request逻辑*/
    requestData(data){
        return this.request(data).then(response=>response.data);
    }
    //返回数据处理
    thenHandle(data,options){
        let {transDataFn } = options
         //统一的错误依据
        if(data['status']==-1){
            return Promise.reject({message:data['msg']})
        }else{
            global.log_info('responseData is -----\n' + JSON.stringify(data).substr(0,1000))
            return  transDataFn(data['data']);
        }
    }
    // 错误处理
    errorHandle(err,options){
        let { mock,transDataFn } = options;
        let {mockBoolean,mochaBoolean} = this.getConst(options);
        //通用 mock 数据返回
        if(mockBoolean){
            return transDataFn(mock)
        }
        //mocha api测试
        if(mochaBoolean){
            return Promise.reject(err);
        }
        //正式环境
        return Promise.resolve(err);
    }
    async fetch(data, options={}) {
        //构造请求数据
        let param = this.beforeRequestData(data,options);
        return this.requestData(param).then(response=> {
                return this.thenHandle(response,options)
            }).catch(error=>{
                return this.errorHandle(error,options)
            })
    }
    async customize_fetch(data, options={}) {
        //构造请求数据
        let param = this.beforeRequestData(data,options);
        //个性化Promise链条
        let { transDataFn,throwError } = options
        return this.requestData(param).then(response=> {
                return transDataFn(response,options)
            }).catch(error=>{
                if(throwError){
                    return Promise.reject(error)
                }else{
                   return this.errorHandle(error,options)
                }
            })
    }
}


