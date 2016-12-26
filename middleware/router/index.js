/*
* @Author: enzo
* @Date:   2016-11-08 15:02:53
* @Last Modified by:   slashhuang
* @Last Modified time: 2016-12-26 12:00:36
*/

const debug = require('debug')('rudy:router');

const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const util = require('../../utils/util');

const methodReg = /([get|post|del|put]*):?(:?.*)/;
const jsFileReg = /([a-zA-Z0-9_\-]+)(\.js)$/;

module.exports = function(_root){
    if (!_root) {
        throw new Error('router setting controller route for all route hashMap');
    }
    /**
     * 遍历文件夹存储路由hashMap
     */
    util.pathLS(_root).forEach(function(filePath) {

        if (!jsFileReg.test(filePath) || filePath.indexOf('_') > -1) {
            return;
        }
        let routerHandler = require(filePath);
        /**
         * 路径规则 由_root作为命名空间
         */
        Object.keys(routerHandler).forEach(item => {
            if (item == '_root') {
                return;
            }
            /**
             * 抽象具名路径
             */
            let pathParamArr = item.match(methodReg);
            let method = pathParamArr[1] || 'get';
            let routerFn = routerHandler[item];
            /**
             * 路径规则
             * get:index:
             * @type {string}
             */
            let routerName= [
                routerHandler['_root']?( '/'+routerHandler['_root']+'/'):'',
                pathParamArr[2]
            ].join('');
            router[method](routerName, routerFn);
        })
    });
    return router.routes()
};