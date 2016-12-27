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
    errorLog :  'error-logs.log',
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
            console.log(shell)
            shell.mkdir('-p',this.envLogPath);
        }
    }
    configLogPath() {
        let { folderName } = this.logConf;
        this.folderPath = path.resolve(process.cwd(), folderName);
        this.envLogPath = path.resolve( this.folderPath,this.env);
    }
    instantiateLog() {
        let { errorLog,infoLog } = this.logConf;
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'info-file',
                    filename: path.resolve(this.envLogPath,infoLog) ,
                    level: 'info'
                }),
                new (winston.transports.File)({
                    name: 'error-file',
                    filename: path.resolve(this.envLogPath,errorLog) ,
                    level: 'error'
                })
            ],
            exceptionHandlers: [
                new winston.transports.File({ filename: path.resolve(this.envLogPath,errorLog) })
            ]
        });
    }
}
module.exports = Logger;