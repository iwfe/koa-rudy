# node-rent-platform

## 开发环境

> node -v >=6.9.0

## 功能
1. 完备的后端模板渲染
2. 路由模块
3. 404、500错误处理
4. service、controller分层
5. 适配不同的开发环境 => dev,test,prod
6. 不同环境的动态错误日志生成


## 目录介绍
|- bin 程序入口  
|  
|- config 配置文件  
|  
|- app 路由和视图  
|- |- apis 客户端 api  
|- |- service 主业务  
|- |- views 视图
|  
|- middleware 中间件  
|- |- body 程序逻辑分发层  
|- |- log 日志系统
|- |- router 视图层  
|- |- static 静态资源层  
|- |- router 路由层  
|  
|- assets 静态资源 图片/font等   
|  
|- utils  工具库  
|  
|- test 单元测试  
|  
|- logs 日志  

## 技术模块及文档地址
1. [路由模块koa-router 2](https://github.com/alexmingoia/koa-router/tree/master/#module_koa-router--Router+get%7Cput%7Cpost%7Cpatch%7Cdelete)
2. [Promise网络请求axios](https://github.com/mzabriskie/axios)
3. [ejs模板渲染](https://github.com/mde/ejs)
4. [工具相关lodash](https://github.com/lodash/lodash)

    1. [lodash文档](https://lodash.com/docs/4.17.2)
    2. [shelljs命令行客户端](https://github.com/shelljs/shelljs)
    
## 业务分层

> API 收集处理客户端请求数据，将处理好的数据发给service
> SERVICE 主业务层，根据业务逻辑分块，去不同的soa请求数据进行封装反馈给API。
> SOA 每个SOA单独模块封装，以HTTP协议请求数据，不做数据封装

## 常用命令

### 三套环境

```bash
    npm run dev || test || prod
```

### 单元测试

```bash
    npm run mocha
```

### 生成API文档

```bash
    npm run doc
```
### 查看API文档

```bash
    npm run pwapi
```

## 部署

dockerFile + Jenkins

## 技术提示
```js
    koa 代理列表
    /**
 * Response delegation.
 */
delegate(proto, 
 'response'------ level------ 
 ['attachment','redirect','remove' 
 'vary','set' ,'append','flushHeaders' ,'status' 
 'message' ,'body' ,'length' ,'type' ,'lastModified' 
 'etag', 'headerSent','writable' ];

/**
 * Request delegation.
 */
delegate(proto, 
 'request' ------ level------ 
 ['acceptsLanguages' , 'acceptsEncodings' ,'acceptsCharsets',
 'accepts' , 'get' , 'is', 
 'querystring' ,'idempotent' ,'socket' ,
 'search' , 'method'  ,'query' , 'path' ,
 'url' , 'origin' ,'href' , 'subdomains' ,
 'protocol' ,'host','hostname' ,'header' ,
 'headers','secure' ,'stale' ,'fresh' ,'ips' 'ip']

```

