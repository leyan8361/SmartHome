const onerror = require('koa-onerror')
const koaLogger = require('koa-logger')
const log = require('../../utils/log')

module.exports = app => {
  onerror(app)
	app.use(koaLogger())
	app.use(async (ctx, next) => {
		const start = new Date()
		await next()
		const ms = new Date() - start
		log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
	})
}
