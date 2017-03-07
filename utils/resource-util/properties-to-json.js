/**
 * 工具方法
 * 解析property成json文件
 */
import fs from "fs-extra";
const ANNOTATION_G_RE = /\s*#[^\n]*/g;

export function propToJson(str){
    let jsonObj = {};
    str = str.replace(ANNOTATION_G_RE,"").split("\n");
    str.forEach(function(e) {
        let arr;
        e = e.trim();
        if(e){
            arr = e.split("=");
            jsonObj[arr[0]] = arr[1];
        }
    });
    return jsonObj;
}
/**
 * @description  properties file to JSON object (sync)
 */
export function propFileToJsonSync(path){
    let jsonObj = {};
    if(!fs.existsSync(path))return jsonObj;
    return propToJson(fs.readFileSync(path,'utf8'));
}
/**
 * @description  string 'true' ==> boolean true
 */
export function parseBool(str){
    return typeof str ==="boolean" ? str : (typeof str === "string" && str.toLowerCase() === "true");
}
