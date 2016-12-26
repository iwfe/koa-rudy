/*
 * @Author: enzo
 * @Date:   2016-11-08 15:02:44
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2016-12-26 15:24:16
 */

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
        //缓存layout，减少io操作
        fileCache.tpl = tpl;
        //渲染的模板内容
        options.templateName = viewPath;
        let renderFn = ejs.compile(tpl, {
            filename:viewPath,
            _with: settings._with,
            compileDebug: settings.debug,
            delimiter: settings.delimiter
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
