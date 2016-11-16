/*
 * @Author: enzo
 * @Date:   2016-11-08 15:02:44
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-16 11:12:41
 */

/**
 * rudy-view
 * TUDO 测试
 * @type {[type]}
 */

const path = require('path');
const copy = require('copy-to');
const fs = require('fs');
const ejs = require('ejs');

ejs.open = '{{';
ejs.close = '}}';


var defaultSettings = {
    cache: true,
    layout: 'layout',
    viewExt: 'html',
    locals: {},
    debug: false,
    writeResp: true
};


module.exports = function view(settings) {

    if (!settings || !settings.root) {
        throw new Error('settings.root required');
    }

    settings.root = path.resolve(process.cwd(), settings.root);

    let cache = Object.create(null);

    copy(defaultSettings).to(settings);

    settings.viewExt = settings.viewExt
        ? '.' + settings.viewExt.replace(/^\./, '')
        : '';

    async function render(view, options) {
        view += settings.viewExt;
        var viewPath = path.join(settings.root, view);
        
        if (settings.cache && cache[viewPath]) {
            return cache[viewPath].call(options.scope, options);
        }

        var tpl = fs.readFileSync(viewPath, 'utf8');

        var fn = ejs.compile(tpl, {
            filename: viewPath,
            _with: settings._with,
            compileDebug: settings.debug,
            delimiter: settings.delimiter
        });

        if (settings.cache) {
            cache[viewPath] = fn;
        }

        return fn.call(options.scope, options);
    }

    return async function view(ctx, next) {

        if (ctx.render) {
            return await next();
        }

        Object.assign(ctx, {
            render: async function(view, _context) {
                var context = {};

                copy(this.state).to(context);
                copy(_context).to(context);
                
                var html = await render(view, context);
                
                var layout = context.layout === false ? false : (context.layout || settings.layout);
                
                if (layout) {
                    context.body = html;
                    html = await render(layout, context);
                }

                var writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);
                if (writeResp) {
                    this.type = 'html';
                    this.body = html;
                } else {
                    return html;
                }
            }
        })

        await next();
    }

}
