/**
 * Created by huangxiaogang on 16/12/26.
 * 视图渲染工具类
 */

let { staticConfigs } = global._appConfig;
let {
        staticResourceConfigURL,
        staticResourceURL
    } = staticConfigs;
/**
 * 提供给ejs模板渲染的函数
 * 类似于后端以前的velocity getURL
 */
let MethodNameSpace = {
    getURL : (tagName)=>{
        return staticResourceURL + '/' + tagName;
    }
};
/**
 * 基本工具类
 */
let addTemplate = function(source,tagOption){
    return Object.assign(source,tagOption)
};
let addConst = function(source){
    return Object.assign(source,staticConfigs)
};
let addMethods = function(source){
    return source.MethodNameSpace = MethodNameSpace
};
module.exports = {
    addMethods,
    addTemplate,
    addConst
};