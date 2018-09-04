## 简介

基于第七届中国软件杯 [B3赛题-智能电器综合管理系统](http://www.cnsoftbei.com/bencandy.php?fid=151&aid=1617) 的赛题要求,个人开发的物联网项目.

## 安装

1. npm install

2. 修改 config 文件夹中 以下配置文件,改成本地
	1. file.json
	2. key.json
	3. db.json

3. 安装 mongodb


## 启动

1. 开启数据库
	> mongod

2. 开启前端服务器
	> npm run serve

3. 开启后端服务器
	> (建议使用 vscode,并配置 node 服务器)cd server && nodemon

4. 开启文件服务器
	> cd files && nodemon

5. 开启MQTT服务器
	> cd mqtt && nodemon


## 架构

1. 前端
	- Vue
	- Element UI
	- Google Material
	- echarts

2. 后端
	- Koa2
	- fundebug
	- log4
	- node-schedule

3. 持久化
	- mongoDB
	- mongoose

4. 硬件
	- Arduino
	- 12864Led
	- esp8266
	- 语音播报

5. 服务器
	- PM2
	- Nginx
	- nodemon
	- mosca

6. 人工智能
	- TensorFlow
	- 线性衰退
	- 损失函数
	- 优化器

7. 通信
	- axios
	- 异步式MQTT封装
	- RESTful

8. 安全
	- Bcrypt
	- 二次salt

## 亮点

1. 异步高并发的 MQTT 通信框架
2. 屋子模型 完美的实物展示
3. tensorflow 智能预测电器功耗
4. 根据用户习惯,天气情况,指定时间智能调电器状态
5. 家庭成员共享电器
6. 语音识别操控电器
7. 联动屏幕,实时显示电器状态
8. 电器故障检测
9. 用户电量统计


## 总结

JS 天下第一!
