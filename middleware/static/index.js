/*
 * @Author: enzo
 * @Date:   2016-11-11 14:54:11
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-11 15:32:52
 */

/**
 * Module dependencies.
 */

const resolve = require('path').resolve;
const debug = require('debug')('rudy-static');
const send = require('koa-send');

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

module.exports = function(root, opts) {
    opts = opts || {};

    opts.root = resolve(root);

    if (opts.index !== false) {
        opts.index =  opts.index || 'index.html';
    }

    if (!opts.defer) {
        return async function serve(ctx, next) {
            // console.log(ctx.method);
            if (ctx.method == 'HEAD' || ctx.method == 'GET') {
                if (await send(ctx, ctx.path, opts)) {
                    return next();
                }
            }
            
            return next();
        };
    }

    return async function serve(ctx, next) {

        // console.log(ctx.method);
        if (ctx.method != 'HEAD' && ctx.method != 'GET') {
            return next();
        }

        if (ctx.body != null || ctx.status != 404) {
            return next();
        }

        send(ctx, ctx.path, opts);
        //next();
    };
};
