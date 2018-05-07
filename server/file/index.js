const Koa = require('koa')
const middleware = require('./middlewares')

const app = new Koa()
middleware(app)

app.listen(8000, () => {
  console.log('文件服务器开启成功！8000 端口')
})
