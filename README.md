# koa-rudy

## 环境

> node -v >=6.9.0
> pm2
> yarn

## 启动

```bash
    npm install
    npm run dev
```

## 开发环境

```bash
    npm run dev || test || prod
```

## 接口测试

```bash
    npm run mocha
```

## 推荐开发工具
[vscode](https://code.visualstudio.com/)

## 实现
1. 支持 async/await
2. MVC架构（middleware-view-controller）
3. RESTful api 接口设计
4. 支持对接SOA服务
5. 支持 Docker 构建发布
6. 接口测试
7. 日志文件系统
8. 适配不同开发环境 => dev,test,prod

## 目录介绍
|- bin 程序入口
|
|- config 配置文件
|
|- app 路由和视图
|- |- apis 客户端 api
|- |- service 对接soa实现主业务
|- |- views 视图
|
|- middleware 中间件
|
|- assets 静态资源 图片/font等
|
|- utils  工具库
|
|- test 测试
|
|- logs 日志

## middleware

1. api
2. body
3. log
4. static
5. view

## 业务分层

> API 收集处理客户端请求数据，将处理好的数据发给service.
> SERVICE 主业务层，根据业务逻辑分块，去不同的soa请求数据进行封装反馈给API.
> SOA 每个SOA单独模块封装，以HTTP协议请求数据，不做数据封装.

## Jenkins
    使用 Jenkins docker image

## docker
[dockerFile](https://github.com/iwfe/koa-rudy/blob/master/Dockerfile)

## 部署

```bash
    sh deploy.sh
```

## 技术模块及文档地址

1. [koa 文档](https://github.com/guo-yu/koa-guide)
2. [路由模块koa-router 2](https://github.com/alexmingoia/koa-router/tree/master/#module_koa-router--Router+get%7Cput%7Cpost%7Cpatch%7Cdelete)
3. [Promise网络请求axios](https://github.com/mzabriskie/axios)
4. [ejs模板渲染](https://github.com/mde/ejs)
    1. [lodash文档](https://lodash.com/docs/4.17.2)
    2. [shelljs命令行客户端](https://github.com/shelljs/shelljs)

