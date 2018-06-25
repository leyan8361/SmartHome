require('module-alias/register')

const Koa = require('koa')
const ip = require('ip')
const router = require('routes')
const http = require('config/http')
const log = require('utils/log')
const middleware = require('middlewares')

const app = new Koa()
middleware(app)
router(app)
require('db')()

require('schedule')()

app.listen(http.port, http.ip, () => {
  log.info(`server is running at http://${ip.address()}:${http.port}`)
})
