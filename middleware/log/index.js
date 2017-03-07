/*
 * @Author: enzo
 * @Date:   2016-11-30 11:08:34
 * @Last Modified by:   slashhuang
 * @Last Modified time: 2017-01-19 15:43:02
 * @modified content : 以stream形式修改日志处理方式
 */

const winston = require('winston');
const Path = require('path');
const env = process.env['NODE_ENV'];

const fs = require('fs');
const fse = require('fs-extra');
const dateUtils = require("date-utils").language("es");

//一小时更新下日志
const heartbeat = 120*60*1000;
// const heartbeat = 10*1000;
const timeReg = 'YYYY-MM-DD';

/*
 * 日志处理系统，在有日志的情况下只保留24个文件
 */
import  { LogQueue }  from './util';

const StreamPiper = require("fs-pipe");

/**
 * 错误处理
 */
const error = msg=> winston.error(msg);
const info = msg => winston.info(msg);

const logger =   function(setting) {
    let { logPath,logName, statusConf } = setting;
    fse.emptyDirSync(logPath);
    //日志常数
    const LogStreamPath = Path.resolve(logPath,logName)
    winston.add(winston.transports.File, {
        filename: LogStreamPath
    });
    //存储2天日志
    let  LogQueueInstance = new LogQueue({
        logPrefix:logPath,
        length:24,
        logJson:{
            'logInterval':`日志记录间隔为${heartbeat/(1000*60*60)}小时`,
            'server.log':`/logs/${logName}`
        }
    })
    // 轮询存储文件
    setInterval(() => {
        let now = new Date();
        let today = now.toFormat(timeReg);
        let newLogId = `server.${today}-${now.getHours()}.log`;
        let newLogPath = Path.resolve(logPath,newLogId);
        new StreamPiper()
                .src(LogStreamPath)
                .pipe(newLogPath)
                .empty(LogStreamPath)
                .final(()=>LogQueueInstance.push(newLogId))
    },heartbeat)
    return function(ctx, next) {
        return next().then(()=>{
                    winston.info(`${ctx.method} ${ctx.origin}${ctx.path} --${ctx.status}\n` );
                    if(ctx.status==404){
                        if(ctx.path.match(/^[^\.]*$/)){
                            winston.error(`302重定向-- path : ${ctx.path} redirecting to path: /`);
                            ctx.redirect('/')
                        }else{
                            ctx.body=`404 NOT FOUND for api or resource -- ${ctx.path}`;
                            ctx.status=404
                        }
                    }
                })
                .catch(err => {
                    let errorMessage = `${err.name}-- ${err.message}  ${err.stack}\n`
                    winston.error(errorMessage);
                    //内部错误
                    if(err instanceof Error){
                        ctx.body = errorMessage;
                        ctx.status=500
                    }
                })
    }
};
export { logger, info, error }
