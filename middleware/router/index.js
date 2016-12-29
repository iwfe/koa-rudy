/*
 * @Author: enzo
 * @Date:   2016-11-08 15:02:53
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-23 16:44:36
 */

const debug = require('debug')('rudy:router');

const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const util = require('../../utils/util.js');

const routerReg = /\/?(\w*).js/;
const methodReg = /([get|post|del|put]*):?(:?.*)/;
const jsfileReg = /([a-zA-Z0-9_\-]+)(\.js)$/;

module.exports = function(setting) {
    let { root, path, website } = setting;

    if (!path) {
        throw new Error('router setting path');
    }

    if (!root) root = '/';

    if (!website) website = '//';

    let appRoot = root != '/' ? '/' + root + '/' : '';

    // all resources
    let resourcesList = {};
    router.get(appRoot, (ctx, next) => {
        ctx.body = JSON.stringify(resourcesList);
    })

    // resources parse
    util.pathls(path).forEach(function(filePath) {

        if (!jsfileReg.test(filePath) || filePath.indexOf('_') > -1) {
            return;
        }

        // router path
        let rootPath = filePath.match(routerReg)[1];

        // resources actions
        let actionList = [];
        router.get(`${appRoot}${rootPath}`, (ctx, next) => {
            ctx.body = JSON.stringify(actionList);
        })

        resourcesList[`${rootPath}_url`] = `${website}${appRoot}${rootPath}`;

        // require module
        let actions = require(filePath);

        actions.length && actions.map((item, index) => {
            let { method, url, version, action } = item;
            let routerPath = rootPath;

            !method ? method = 'get' : '';
            version ? routerPath = `${appRoot}${version}/${routerPath}` :
                routerPath = `${appRoot}${routerPath}`;

            routerPath = `${routerPath}${url}`;

            delete item.url;

            item.href = `${website}${routerPath}`;

            actionList.push(item);

            router[method](routerPath, action);
        })

    });

    return router.routes()
};