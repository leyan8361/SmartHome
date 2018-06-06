const onerror = require('koa-onerror')
const koaLogger = require('koa-logger')

module.exports = app => {
  onerror(app)
	app.use(koaLogger())
	app.use(async (ctx, next) => {
		const start = new Date()
		await next()
		const ms = new Date() - start
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
	})
}
