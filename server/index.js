const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const jwt = require('koa-jwt')
const cors = require('kcors')
const router = require('./routes')
const morgan = require('koa-morgan')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const config = require(path.resolve('config/config.json'))
const session = require('koa-session')

const dbConnect = require('./middlewares/db')

dbConnect(config)

const app = new Koa()

app.keys = ['captcha']
app.use(session({ maxAge: 3600 * 24, }, app))

app.use(async function(ctx, next) {
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin)
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 86400000);
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  await next()
})

onerror(app)
app.use(cors())
app.use(logger())
app.use(bodyParser())

const file = path.resolve('dist')
app.use(koaStatic(file))

app.use(router.routes()).use(router.allowedMethods())

app.use( morgan('dev', { skip(req, res) { return res.statusCode < 400 } }) )
app.use( morgan('combined', { stream: fs.createWriteStream(__dirname + '/logs/access.log', { flags: 'a' }) }) )

const pub = fs.readFileSync(path.resolve('config/rsa_public_key.pem'))
app.use(jwt({ secret:pub}).unless({path:[/\/api/]}))

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
app.use(staticCache(file, {
  maxAge: 365 * 24 * 60 * 60
}))

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.listen(config.port, () => {
	console.log('listening...')
})
