const fs = require('fs')
import Koa from 'koa'
const path = require('path')
const jwt = require('koa-jwt')
const cors = require('koa-cors')
// const cors = require('kcors');
const router = require('./routes')
const morgan = require('koa-morgan')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const session = require('koa-session')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const config = require(path.resolve('config/config.json'))

const app = new Koa()
// const json = require('koa-json')
// app.use(json())


// session
app.keys = ['captcha']


const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
//  ctx.session.views = ++n;

/*
app.use(require('koa-compress')())
// 数据压缩
app.use((ctx, next) => {
  ctx.compress = true // 开启关闭
  ctx.body = fs.createReadStream(file)
})
 */
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
