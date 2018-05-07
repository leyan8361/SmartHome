const Koa = require('koa')
const middleware = require('./middlewares')

const app = new Koa()
middleware(app)

app.listen(8000, () => {
	// 如果线上 搭建文件服务器很困难，可以把文件服务器集成到后台服务器，带宽什么的 无所谓了
  console.log('文件服务器开启成功！8000 端口')
})
