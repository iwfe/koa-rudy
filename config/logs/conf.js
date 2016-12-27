/**
 * Created by huangxiaogang on 16/12/27.
 * nodeJS项目日志系统
 */
const winston = require('winston');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

/**
 * 基本的日志配置
 */
const logConf = {
    //日志文件夹
    folderName : 'logs',
    // 错误日志文件
    errLog :  'error-logs.log',
    // info日志文件
    infoLog : 'info-logs.log'
};
class Logger {
    constructor() {
        this.logConf = logConf;
        this.env = process.env['NODE_ENV'];
        this.configLogPath();
        this.mkLogDir();
        this.instantiateLog();
    }
    mkLogDir(){
        try{
            fs.readdirSync(this.envLogPath);
        }catch(e){
            console.log(`make ${this.env} log directory now `)
            shell.mkdir('-p',this.envLogPath);
        }
    }
    configLogPath() {
        let { folderName } = this.logConf;
        this.folderPath = path.resolve(process.cwd(), folderName);
        this.envLogPath = path.resolve( this.folderPath,this.env);
    }
    instantiateLog() {
        let { infoLog,errLog } = this.logConf;
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    name: 'info-file',
                    filename: path.resolve(this.envLogPath,infoLog) ,
                    level: 'info',
                    json: true
                }),
                new winston.transports.File({ 
                    name: 'error-file',
                    filename: path.resolve(this.envLogPath,errLog) ,
                    level: 'error',
                    json: true
                })
            ]
        });
    }
}
module.exports = Logger;