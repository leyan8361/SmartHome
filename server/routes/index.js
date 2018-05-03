const router = require('koa-router')()
const api = require('./api')
const auth = require('./auth')
router.use('/api', api.routes()).use(api.allowedMethods())
router.use('/auth', auth.routes()).use(auth.allowedMethods())

module.exports = router
