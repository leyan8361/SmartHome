const logger = require('./log')
const onerror = require('koa-onerror')
const koaLogger = require('koa-logger')
const log = require('../../utils/log')
module.exports = app => {
  let loggerMiddleware = logger()
  app.use(async (ctx, next) => {
    return loggerMiddleware(ctx, next).catch(e => {
      if (ctx.status < 500) {
        ctx.status = 500
      }
      ctx.log.error(e.stack)
      ctx.state.logged = true
      ctx.throw(e)
    })
  })
  onerror(app)
  app.use(koaLogger())

  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
		const ms = new Date() - start
		log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
