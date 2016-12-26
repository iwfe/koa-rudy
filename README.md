# node-rent-platform

## 开发环境

> node -v >=6.9.0

## 目录介绍
|- bin 程序入口
|
|- config 配置文件
|
|- app 路由和视图
|- |- controller 程序逻辑分发层
|- |- service 网络服务层
|- |- views 视图层
|
|- middleware 中间件
|- |- body 程序逻辑分发层
|- |- error 网络服务层
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
|- document API文档
|
|- logs 日志

## 技术模块及文档地址
1. [路由模块koa-router 2](https://github.com/alexmingoia/koa-router/tree/master/#module_koa-router--Router+get%7Cput%7Cpost%7Cpatch%7Cdelete)
2. [Promise网络请求axios](https://github.com/mzabriskie/axios)
3. [ejs模板渲染](https://github.com/mde/ejs)
4. [工具相关lodash](https://github.com/lodash/lodash)
    > [文档](https://lodash.com/docs/4.17.2)
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

