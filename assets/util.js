const path = require('path');
const fs = require('fs');
/**
 * 简易模板引擎，实现配置文件转换为真实数据
 * @param  {object} obj  配置文件
 * @param  {object} data 模板数据
 * @return {object}      真实配置
 */
exports.replace = function replace (obj, data) {
  let json = JSON.stringify(obj);

  json = json.replace(/(\$\{)([a-zA-Z0-9-_]+)(\})/g , function(block, pre, val , end){
    return data[val];
  })

  return JSON.parse(json);
}

exports.fetchComponent = function(dispatch, components, params) {
    //components.reduce();
    //console.log(components);
    //console.log(443434);
  // const needs = components.reduce( (prev, current) => {
  //   console.log(6767);
  //   return (current.need || []) 
  //     .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
  //     .concat(prev);
  //   }, []);

  //   const promises = needs.map(need => dispatch(need()));
  //   return Promise.all(promises);
}

/**
 * 查找目录中的所有文件
 * @param  {string} dir       查找路径
 * @param  {init}   _pending  递归参数，忽略
 * @param  {array}  _result   递归参数，忽略
 * @return {array}            文件list
 */
exports.pathls = function pathls(dir, _pending, _result) {
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
      pathls(path.join(dir, part), _pending, _result);
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
exports.merge = function merge (dest, src) {
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
    index ++;
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
exports.makeConfig = function makeConfig (obj, data) {
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
