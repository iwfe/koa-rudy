/**
 * 静态资源拉取模块
 * @maintainers [zongqin.li, slashhuang]
 */
//工具相关
import axios from "axios";
import fs from "fs-extra";
import _ from 'lodash';
import  path from 'path';
import { propFileToJsonSync,parseBool } from "./properties-to-json";
//node环境
const C_W_D = process.cwd();
const NODE_ENV = process.env['NODE_ENV'];
// 静态资源相关
const STATIC_CONFIGS = global._appConfig.staticConfigs;
const STATIC_RESOURCE_NAME = "staticResource.properties";
const STATIC_CONFIG_NAME = "staticResourceConfig.properties";
const STATIC_PATH = "/assets/resource/";

class PropertiesUtil{
    constructor(){
        //拉取状态控制变量
        this.staticResourceMD5 = "";
        //拉取config中的MD5暂存变量
        this.tmpMD5 = "";
        //静态资源文件路径
        this.static_resource_file_path = C_W_D + STATIC_PATH + STATIC_RESOURCE_NAME;
        this.static_config_file_path = C_W_D + STATIC_PATH + STATIC_CONFIG_NAME;
        //静态资源配置JSON对象
        this.ResourceJSON = {};
        //创建资源目录
        fs.ensureDir("."+STATIC_PATH,(err)=>{
            if(err)console.log(err);
        });
        //清空资源目录
        fs.emptyDirSync(path.normalize(C_W_D+STATIC_PATH));
        console.log('empty dir-------',path.normalize(C_W_D+STATIC_PATH));

        // 开发环境用本地资源
        //基本的数据检查
        try{
            if(!STATIC_CONFIGS){
                throw new Error("staticConfigs error!");
            }
            this.staticResourceConfigURL = STATIC_CONFIGS.staticResourceConfigURL;
            this.staticResourceURL = STATIC_CONFIGS.staticResourceURL;
            if (!_.trim(this.staticResourceConfigURL) || !_.trim(this.staticResourceURL)) {
                throw Error("staticResourceConfigURL or staticResourceURL config error!");
            }
        }catch(err){
            this.errorHandler=err;
        }
    }
    /**
     * 加载staticResourceConfig.properties
     */
    loadStaticResourceConfig(callback){
        let  static_resource_file_path = this.static_resource_file_path;
        let static_config_file_path = this.static_config_file_path;
        this.downloadToLocal(this.staticResourceConfigURL,static_config_file_path).then(()=>{
            let newJson = propFileToJsonSync(static_config_file_path);
            fs.writeJsonSync("."+STATIC_PATH + "staticResourceConfig.json",newJson);
            global.log_info("load file " + STATIC_CONFIG_NAME + " finish.");
            this.tmpMD5 = newJson["staticResourceMD5Order"];
            //如果本地存储的md5和远程的md5不同，或者本地没有resource文件，则进行后续property文件更新操作
            //先默认无论如何都更新
            if( this.staticResourceMD5 != this.tmpMD5 || !fs.existsSync(static_resource_file_path)){
                global.log_info(`begin loading staticResource.properties`);
                callback && callback(parseBool(newJson["autoReload"]));
            }
        });
    }
    /**
     * 加载staticResource.properties文件
     */
    loadStaticResource(autoLoad=true){
        let self = this;
        let static_resource_file_path = this.static_resource_file_path;
        //自动拉取才去更新信息，第一次的时候默认自动拉取
        if(autoLoad){
            this.downloadToLocal(this.staticResourceURL,static_resource_file_path).then(()=>{
                let resourceJson = propFileToJsonSync(static_resource_file_path);  
                // 缓存json配置
                this.ResourceJSON = resourceJson;
                fs.writeJson("."+STATIC_PATH + "staticResource.json", resourceJson, function (err) {
                    if(err){
                        global.log_error("load file " + STATIC_RESOURCE_NAME + err.msg+ " failed.");
                    }else{
                        self.staticResourceMD5 = self.tmpMD5;
                        global.log_info("load file " + STATIC_RESOURCE_NAME + " finish.");
                    }
                })
                
            });
        }
    }
    //对外的resource接口
    getResourceJSON(){
        //全局缓存配置文件
       return this.ResourceJSON
    }
    downloadToLocal(url, local){
        return new Promise((resolve,reject)=>{
            axios.get(url).then((response)=>{
                console.log(`getting file from ${url}`);
                fs.outputFileSync(local,response.data);
                resolve(response.data);
            }).catch((err)=>{
                console.log(`${url} download failed`);
                reject(err);
            });
        });
    }
    // 拉取文件入口方法
    startLoadProperties(){
        //本地开发环境不用拉取静态资源
        global.log_info('process.env-----'+process.env['NODE_ENV']);
        if(this.errorHandler){
            global.log_info('error happened , pull resource data from origin suspended--');
            return ;
        }
        global.log_info('------ start loading static resource info -------');
        this.loadStaticResourceConfig(()=>{
            this.loadStaticResource();
        });
        if (NODE_ENV != "dev") {
            // 每半分钟定时装载staticResourceConfig任务
            var setTimeLoad = ()=>{
                setTimeout(() => {
                    global.log_info('------ timeout check for  static resource -------');
                    this.loadStaticResourceConfig((boolean)=>{
                        this.loadStaticResource(boolean);
                    });
                    setTimeLoad();
                },30*1000);
            };
            setTimeLoad();
        }
    }
}  
module.exports = new PropertiesUtil();