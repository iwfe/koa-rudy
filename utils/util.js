const path = require('path');
const fs = require('fs');
import copy from "copy-to";
import _ from "lodash";
import dateUtils from "date-utils";

/**
 * 抛出错误日志
 */
exports.throw = function(msg = '这一个默认的错误msg', status = 500) {
    let err = new Error(msg);
    err.status = status;

    throw err;
}

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
 * 简易模板引擎，实现配置文件转换为真实数据
 * @param  {object} obj  配置文件
 * @param  {object} data 模板数据
 * @return {object}      真实配置
 */
exports.replace = function replace(obj, data) {
    let json = JSON.stringify(obj);

    json = json.replace(/(\$\{)([a-zA-Z0-9-_]+)(\})/g, function(block, pre, val, end) {
        return data[val];
    })

    return JSON.parse(json);
}

/**
 * 查找目录中的所有文件
 * @param  {string} dir       查找路径
 * @param  {init}   _pending  递归参数，忽略
 * @param  {array}  _result   递归参数，忽略
 * @return {array}            文件list
 */
exports.pathLS = function pathLS(dir, _pending, _result) {
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

/**
 * 深度merge对象
 * @param  {object} dest 要merge到的对象
 * @param  {object} src  要从这个对象merge
 * @return {object}      merge后的对象
 */
exports.merge = function merge(dest, src) {
    function isLast(obj) {
        if (Object.prototype.toString.call(obj) == '[object Object]') {
            let ret = false;
            for (var key in obj) {
                ret = obj.key === undefined ? ret : true;
            }
            return ret;
        } else {
            return true;
        }
    }

    function update(obj, key, last, value) {
        let keys = key.split('.');
        let now = obj;
        keys.forEach(item => {
            now = now[item];
        });
        now[last] = value;
    }

    let index = -1;
    let lines = [{
        old: dest,
        obj: src,
        key: ''
    }];

    if (isLast(src)) return dest;

    while (index < lines.length - 1) {
        index++;
        let item = lines[index];
        for (var k in item.obj) {
            if (isLast(item.obj[k]) || item.old[k] === undefined) {
                update(dest, item.key, k, item.obj[k]);
            } else {
                lines.push({
                    old: item.old[k],
                    obj: item.obj[k],
                    key: item.key + (item.key ? '.' : '') + k
                });
            }
        }
    }

    return dest
}

/**
 * 实现配置文件转换为真实数据
 * @param  {object} obj  配置文件
 * @param  {object} data 模板数据
 * @return {object}      真实配置
 */
exports.makeConfig = function makeConfig(obj, data) {
    if (data.merge) {
        obj = merge(obj, data.merge);
    }
    return exports.replace(obj, data);
}

/**
 * 通过 process.argv 获取命令行配置项
 * @return {object} 配置项
 */
exports.parseArg = function parseArg() {
        let argvs = process.argv;
        let result = {};

        let REG = /^--[a-zA-Z0-9]+\=[a-zA-Z0-9]+$/;

        argvs.map(function(item) {
            if (!REG.test(item)) {
                return
            }

            let arr = item.split('=');
            let key = arr[0].slice(2);

            result[key] = arr[1];
        })

        return result;
    }
    /**
     * url参数处理
     */
export function getParams(string) {
    JSON.parse('{' + string.replace(/=/g, ':').replace(/&/g, ',').replace(/:,/g, ':\'\'') + '}')
}
/**
 * 下划线分隔转为驼峰
 */
var camelizeRE = /_(\w)/g
export function camelize(str) {
    return str.replace(camelizeRE, toUpper)
}

/**
 * 转为大写
 */
function toUpper(_, c) {
    return c ? c.toUpperCase() : ''
}
/**
 * 驼峰转为中线分隔
 */
var hyphenateRE = /([a-z\d])([A-Z])/g
export function hyphenate(str) {
    return str
        .replace(hyphenateRE, '$1-$2')
        .toLowerCase()
}

/**
 * 返回方法，方法为处理数据保留两位小数
 */
export function twoDecimals(float) {
    return function(num) {
        let tmp = Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2);
        let result;
        if ((tmp + '').includes('.')) {
            result = !!float ? parseFloat(tmp) : tmp + '';
        } else {
            tmp = tmp + '.00'
            result = !!float ? parseFloat(tmp) : tmp;
        }
        return result;
    }
}
/**
 * 每3位数字用逗号分隔
 */
export function stringDot(str) {
    let dot = str.replace(/\d+/, '');
    let num = (str.match(/\d+/))[0];
    let result = '',
        tmp = [],
        len = num.length;
    for (let i = len - 3; i >= (0 - (len % 3)); i -= 3) {
        if (i < 0) {
            tmp.push(num.substr(0, len % 3));
        } else {
            tmp.push(num.substr(i, 3));
        }
    }
    result = tmp.reverse().join(',');
    return result + dot;
}

export function decimalFormat (float){
    return function(){
        
    }
}

/**
 * 执行字符串函数
 */
export function runFun(str) {
    return (typeof str === 'string' && eval(str));
}

/**
 * 日期的计算与格式化
 */
export function dateFormat(date, format) {
    try {
        date = new Date(date);
    } catch (e) {
        console.log('传入日期时间参数有误！');
    }
    let result = format,
        year = /y+/,
        month = /m+/,
        day = /d+/;
    let hour = /h+/,
        fen = /f+/,
        seconds = /s+/;
    result = year.test(result) ? result.replace(year, date.getFullYear()) : result;
    result = month.test(result) ? result.replace(month, (date.getMonth() + 1)) : result;
    result = day.test(result) ? result.replace(day, date.getDate()) : result;
    result = hour.test(result) ? result.replace(hour, date.Hours()) : result;
    result = fen.test(result) ? result.replace(fen, date.getMinutes()) : result;
    result = seconds.test(result) ? result.replace(seconds, date.getSeconds()) : result;
    return result;
}

/**
 * 日期计算  unit
 * + - 天d
 * + - 时h
 * + - 分m
 * + - 秒s
 */
export function calDate(timeTntercept, calNum, unit, isAdd) {
    let tempIntercept;
    unit = unit || 'd';
    calNum = parseInt(calNum);
    if (typeof isAdd === "undefined") {
        isAdd = true
    }
    switch (unit) {
        case 'd':
            tempIntercept = 1000 * 60 * 60 * 24 * calNum;
            break;
        case 'h':
            tempIntercept = 1000 * 60 * 60 * calNum;
            break;
        case 'm':
            tempIntercept = 1000 * 60 * calNum;
            break;
        case 's':
            tempIntercept = 1000 * calNum;
            break;
    }
    return isAdd ? timeTntercept + tempIntercept : timeTntercept - tempIntercept;
}