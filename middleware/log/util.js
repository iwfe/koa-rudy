/*
 * 日志中间件文件存储处理
 * @author slashhuang
 * 2017/2/19
 */
const fs = require('fs');
const path = require('path');

/*日志系统队列*/
export
class LogQueue{
    constructor(options){
        let {length,logPrefix,logJson} = options;
        this.logQueue = [];
        this.length = length;
        this.logPrefix = logPrefix;
        this.logFsPath = path.resolve(logPrefix,'config.json');
        this.logJSON=logJson || { };
        //生成json文件
        this.writeLogList(this.logJSON)
    }
    //写日志列表
    writeLogList(logJSON){
        fs.writeFile(this.logFsPath,JSON.stringify(logJSON,2,2));
    }
    //推送日志
    push(logId){
        //如果已经有该日志了，则不推送
        if(this.logQueue.indexOf(logId)>-1){
           return
        }
        //存储数据
        this.logQueue.push(logId);
        this.logJSON[logId] = `/logs/${logId}`
        //管理队列
        if(this.logQueue.length>this.length){
            this.remove(this.logQueue.shift())
        };
        //生成json文件
        this.writeLogList(this.logJSON)
    }
    //移除第一个日志
    remove(logId){
        let popLog = path.resolve(this.logPrefix,logId);
        //删除日志
        delete this.logJSON[logId]
        fs.unlink(popLog);
    }
}





