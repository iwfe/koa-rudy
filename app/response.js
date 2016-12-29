/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:54
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-29 10:26:58
 */


const SUCCESS_TEXT = '处理成功';
const ERRER_TEXT = '处理失败';

/**
 * 渲染页面
 * 返回指定静态html
 * @param  {[type]} ctx   [description]
 * @param  {[type]} page  [description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */

export function successToView(ctx, view, param) {
    ctx.body = ctx.render(view, param)
}


/**
 * 返回成功json数据
 * @param  {[type]} ctx   [description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */

export function successToJson(ctx, param, status = 200, msg = SUCCESS_TEXT) {
    let data = {
        data: param,
        status: status,
        msg: msg
    }

    ctx.body = JSON.stringify(data);
}

/**
 * 返回失败json数据
 * @param  {[type]} ctx   [description]
 * @param  {[type]} status [description]
 * @return {[type]} param   [description]
 */

export function errorToJson(ctx, param, status = 500, msg = ERRER_TEXT) {
    let data = {
        data: param,
        status: status,
        msg: msg
    }

    ctx.body = JSON.stringify(data);
}


/**
 * 页码封装器
 * @param total:总数
 * @param currentPage:当前页码
 * @param pageSize: 页目
 */
export function pageBar(total, currentPage, pageSize) {
    let page = {
        total: total,
        currentPage: currentPage,
        pageSize: pageSize
    }

    if (total % pageSize == 0) {
        page.lastPage = total / pageSize;
    } else {
        page.lastPage = total / pageSize + 1;
    }

    if (page.lastPage > 100) page.lastPage = 100;

    return page;
}