# SmartHome

:bulb: 智能家居管理系统 http://softbei.cn:17014

> 基于 BS 的综合管理系统

---



## 开发者



#### 简介

称呼：Simon Ma
长春工业大学 大二学生。

> 热爱开源，拒绝静态类型约束。

[更多信息](https://tomotoes.com/about)



#### 联系我

[Github](https://github.com/tomotoes)
[个人站点](https://tomotoes.com)

邮箱: 1755811882@qq.com



## 项目技术栈

1. 前端：

  框架：Vue

  Vue 插件：vue-class-component 、vue-property-decorator

  HTML 预处理：Pug

  CSS 预处理：Stylus

  CSS 后置处理：POSTCSS

  图标：iconfont

  界面：ElementUI

​   数据可视化：echarts 、v-charts

​   通信：axios

   动画：vue2-animate 、nprogress 、vue-textra

   数据流：vuex

   路由：vue-router




2. 安全：

   加密：bcrypt

   通信：jsonwebtoken




3. 工具

  cookie: js-cookie

  跨域：kcors

  模块导入：module-alias

  日期：moment

  规范检测：eslint

  命令行：chalk

  git规范：commitizen ，conventional-changelog ，cz-conventional-changelog 、yorkie

  定时器：node-schedule

  PWA：register-service-worker

  验证码：svg-captcha

  远程监控：fundebug-nodejs

  天气接口：和风

  日志：log4js

  移动端：PWA




4. 服务管理

  PM2 、nodemon、Docker、travis




5. 测试：mosca



6. 硬件

  服务器：mqtt

  开发：Arduino



7. 后端：

  框架：Koa

  通信解析：koa-body，koa-body-parser

  权限：koa-jwt，koa-session

  日志：koa-logger

  监控：koa-onerror，

  路由：koa-router

  静态文件：koa-static

  缓存：koa-static-cache



8. 数据库

  数据库：MongoDB
  控制：Mongoose





## 项目运行

工具：VSCode
系统：Linux mint



### Install

运行环境相关依赖：

1. node 环境支持
1. MongoDB 数据库



### 项目开启



1. 依赖安装

   > npm install



2. 数据库开启

   > mongod



2. 数据库初始化

```bash
mongo

use SmartHome

db.createUser({user:"simon",pwd:"mj11241124",roles:[{role:"dbAdmin",db:"SmartHome"}]})
```



4. 开启前端服务器

   > 本地: npm run serve
   > 部署: nginx

4. 开启后端服务器

   > 本地: 推荐 VSCode 结合 nodemon 调试
   > 部署: nginx + PM2

4. 开启文件服务器

   > 本地: nodemon run files
   > 部署: nginx

4. 开启MQTT服务器

   > 本地: nodemon mqtt 或 pm2 start mqtt
   > 部署: 采用 apache-apollo 服务器



## 项目亮点

安全通信
密码加密
头像存储
任务调度
统计电量
控制硬件
RESTful 规范
页面丰富动画
数据可视化
高级指令
家庭共享

......



## TODO

多电器


性能调优

智能推荐
功耗预测
语音识别
故障预测
