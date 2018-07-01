require('module-alias/register')

const Koa = require('koa')
const middleware = require('./middlewares')
const { port } = require('config/file')

const log = require('utils/log')

const app = new Koa()
middleware(app)

app.listen(port, () => {
	log.success(`Static Files Server is Runing at ${port}`)
})
