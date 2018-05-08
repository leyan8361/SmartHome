const staticCache = require('koa-static-cache')
const serve = require('koa-static')
module.exports = app => {
	const file = '../../files'

	app.use(async (ctx, next) => {
		await next()
		ctx.status = 200
		ctx.set('Cache-Control', 'must-revalidation')
		if (ctx.fresh) {
			ctx.status = 304
			return
		}
	})
	app.use(staticCache(file, { maxAge: 365 * 24 * 60 * 60 }))

	app.use(serve(file))
}
