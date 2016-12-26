/*
 * @Author: enzo
 * @Date:   2016-11-21 10:41:54
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-29 10:26:58
 */

import qrcode from "qr-image";
import images from "images";

/**
 * 渲染页面
 * 返回指定静态html
 * @param  {[type]} ctx   [description]
 * @param  {[type]} pageName  页面名字
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */

export function successToPage(ctx, pageName, param) {
    ctx.body = ctx.render(pageName, param)
}


/**
 * 返回成功json数据
 * @param  {[type]} ctx   [description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */

export function successTojson(ctx, param) {
    let data = {
        data: param,
        msg: '200'
    }

    ctx.body = JSON.stringify(data);
}


/**
 * 返回失败json数据
 * @param  {[type]} ctx   [description]
 * @param  {[type]} status [description]
 * @return {[type]} param   [description]
 */

export function errorTOjson(ctx, status, param) {
    let data = {
        data: param,
        msg: status
    }

    ctx.body = JSON.stringify(data);
}


/**
 * 二维码处理
 * @return {[string]} url [url]
 * @return {[boole]} image [叠加图片]
 */
export function creatQr(url, image) {
    let img = qrcode.image(url, {
        parse_url: true
    });

    if (image) {
        return images(img).size(400).draw(images(image), 70, 260);
    } else {
        return img;
    }
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

/**
 * 获取格式化的限额：
 * 1）如果能被10000整除，XXX万
 * 2）如果能被1000整除，XXX千
 * 3）直接变成字符串
 */
export function limitFormat(limit) {
    limit = Number(limit);

    if (limit % 10000 == 0) {
        limit = (limit / 10000) + "万";
    } else if (limit % 1000 == 0) {
        limit = (limit / 1000) + "千";
    }
    return limit;
}

export function isNotBlank() {

}