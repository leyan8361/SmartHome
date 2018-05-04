const staticCache = require('koa-static-cache')
const koaStatic = require('koa-static')
const path = require('path')

module.exports = app => {
	const file = path.resolve('dist')

	app.use(async (ctx, next) => {
		if (ctx.url == '/favicon.ico') return
		await next()
		ctx.status = 200
		ctx.set('Cache-Control', 'must-revalidation')
		if (ctx.fresh) {
			ctx.status = 304
			return
		}
	})
	app.use(
		staticCache(file, {
			maxAge: 365 * 24 * 60 * 60
		})
	)
	app.use(koaStatic(file))
}
