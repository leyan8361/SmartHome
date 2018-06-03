const Common = require('../controller/common')
const User = require('../controller/user')
const Family = require('../controller/family')
const Notice = require('../controller/notice')

const auth = require('koa-router')()
const fami = require('koa-router')()
const notice = require('koa-router')()

auth.get('/userInfo',User.getUserInfo)
auth.post('/userInfo', User.updateUserInfo)
auth.delete('/news/:type',User.newsToZero)

fami.get('/userInfo',Family.search)
fami.post('/member',Family.invite)

// notice.get('/family')

auth.use('/family',fami.routes()).use(fami.allowedMethods())

module.exports = auth
