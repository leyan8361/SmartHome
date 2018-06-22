const User = require('controller/user')
const Family = require('controller/family')
// const Notice = require('controller/notice')
const Electric = require('controller/electric')
// const Usagelog = require('controller/usagelog')
const Scripts = require('controller/scripts')
const Feedback = require('controller/feedback')

const auth = require('koa-router')()
const fami = require('koa-router')()
// const notice = require('koa-router')()
const electric = require('koa-router')()

auth.get('/userInfo',User.getUserInfo)
auth.post('/userInfo', User.updateUserInfo)
auth.delete('/news/:type',User.newsToZero)

auth.put('/script', Scripts.addScript)
auth.post('/script', Scripts.disableScript)
auth.delete('/script', Scripts.deleteScript)

auth.put('/feedback', Feedback.addFeedback)

fami.get('/userInfo',Family.search)
fami.post('/member',Family.invite)

electric.post('/bulb',Electric.updateBulb)
electric.delete('/bulb',Electric.deleteBulb)
electric.put('/bulb', Electric.addBulb)
electric.patch('/bulb', Electric.renameBulb)

electric.post('/bulbs',Electric.switchBulbs)
electric.get('/bulbs',Electric.switchBulbsStatus)

// notice.get('/family')

auth.use('/family',fami.routes()).use(fami.allowedMethods())
auth.use('/electric',electric.routes()).use(electric.allowedMethods())

module.exports = auth
