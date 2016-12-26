/*
 * @Author: enzo
 * @Date:   2016-11-08 15:02:44
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-26 15:24:16
 */
import Utils from './util';

const path = require('path');
const copy = require('copy-to');
const fs = require('fs');
const ejs = require('ejs');

var defaultSettings = {
    cache: true,
    _with:false, //将所有的值存储到locals大对象里面
    layout: 'layout',
    viewExt: '.html',
    locals: {},
    debug: false,
    writeResp: true
};

module.exports = function view(settings) {
    if (!settings || !settings.root) {
        throw new Error('settings.root required');
    }
    settings.root = path.resolve(process.cwd(), settings.root);

    copy(defaultSettings).to(settings);
    //用于IO数据缓存
    let fileCache = {};

    async function render(subViewName, options) {
        let {
                root,
                layout,
                viewExt
            } = settings;
        let viewPath = path.join(root,subViewName+viewExt);
        // layout外层
        let tpl =fileCache.tpl || fs.readFileSync(path.join(root,layout+viewExt), 'utf8');
        // 生产环境缓存layout，减少io操作
        if(process.env['NODE_ENV']=='prod'){
            fileCache.tpl = tpl;
        }
        // 渲染的模板内容
        Utils.addTemplate(options,{templateName:viewPath});
        Utils.addConst(options);
        Utils.addMethods(options);
        let renderFn = ejs.compile(tpl, {
            localsName:"locals", // 变量的命名空间
            _with: true, //使用with结构渲染
            compileDebug: process.env['NODE_ENV']!='prod',
            delimiter: settings.delimiter || '%' //使用默认的%符号
        });
        return renderFn(options);
    }

    return async function view(ctx, next) {
        if (ctx.render) {
            return await next();
        }
        Object.assign(ctx, {
            render: async function(view, _context) {
                var context = {};
                copy(_context).to(context);
                var html = await render(view, context);
                ctx.type = 'html';
                ctx.body = html;
            }
        });
        await next();
    }
};
