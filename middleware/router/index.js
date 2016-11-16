/*
* @Author: enzo
* @Date:   2016-11-08 15:02:53
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 17:03:52
*/

const debug = require('debug')('rudy:router');

const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const util = require('../../assets/util');

const routerReg = /\/?(\w*).js/;
const methodReg = /([get|post|del|put]*):?(:?.*)/;
const jsfileReg = /([a-zA-Z0-9_\-]+)(\.js)$/;

module.exports = function(_root){
    
    if (!_root) {
        throw new Error('router setting _root');
    }

    util.pathls(_root).forEach(function(filePath) {

        if (!jsfileReg.test(filePath)) {
            return;
        }

        // router path
        let rootPath = filePath.match(routerReg)[1];
        // require module
        let exportFuncs = require(filePath);

        let appRoot = '/';

        Object.keys(exportFuncs).forEach(item => {
            if (item == '_root') {
                return;
            }
            
            let pathparss = item.match(methodReg);
            let method = pathparss[1];
            let routername = pathparss[2];
            let routerfn = exportFuncs[item];

            method ? '' : method = 'get';
            routername ? routername = rootPath+routername : rootPath;

            if (exportFuncs['_root']) {
                appRoot = exportFuncs['_root']+'/';
            }

            routername = appRoot+routername;

            console.log(routername);

            router[method](routername, routerfn);
        })

    });

    return router.routes()
};
