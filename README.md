# node-rent-platform

## 开发环境

> node -v >=6.9.0

## 目录介绍
> app 路由和视图
> assets 静态和公共资源
> bin 程序入口
> config 配置文件
> document API文档
> logs 日志
> middleware 中间件
> service 主要业务逻辑
> test 单元测试

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

## soa 联系人
*  memcachedClient  缓存服务器
*  userClient  邹梦雨
*  noticeClient 杨雨姗
*  cmsClient 邹梦雨
*  userSOAClient  邹梦雨
*  couponUserSOAClient 邹梦雨





