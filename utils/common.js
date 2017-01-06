/*
 * @Author: enzo
 * @Date:   2016-11-08 15:02:53
 * @Last Modified by:   enzo
 * @Last Modified time: 2016-11-23 16:44:36
 */

const path = require('path');
const fs = require('fs');

import copy from "copy-to";
import _ from "lodash";
import dateUtils from "date-utils";


/**
 * 日期格式化
 * @param date:时间戳
 * @param reg:格式化
 */
export function dateFormatReg(date, reg = 'YYYY-MM-DD HH24:MI:SS') {
    dateUtils.language("es");
    var dt = new Date(date);
    return dt.toFormat(reg);
}

/**
 * 查找目录中的所有文件
 * @param  {string} dir       查找路径
 * @param  {init}   _pending  递归参数，忽略
 * @param  {array}  _result   递归参数，忽略
 * @return {array}            文件list
 */
exports.pathls = function pathLS(dir, _pending, _result) {
    _pending = _pending ? _pending++ : 1;
    _result = _result || [];

    if (!path.isAbsolute(dir)) {
        dir = path.join(process.cwd(), dir);
    }

    // if error, throw it
    let stat = fs.lstatSync(dir);

    if (stat.isDirectory()) {
        let files = fs.readdirSync(dir);
        files.forEach(function(part) {
            pathLS(path.join(dir, part), _pending, _result);
        });
        if (--_pending === 0) {
            return _result;
        }
    } else {
        _result.push(dir);
        if (--_pending === 0) {
            return _result;
        }
    }
};