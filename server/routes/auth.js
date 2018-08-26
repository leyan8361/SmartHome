const User = require('controller/user')
const Family = require('controller/family')
const Notice = require('controller/notice')
const Electric = require('controller/electric')
const Usagelog = require('controller/usagelog')
const Scripts = require('controller/scripts')
const Feedback = require('controller/feedback')
const Audio = require('controller/audio')

const auth = require('koa-router')()
const fami = require('koa-router')()
const notice = require('koa-router')()
const electric = require('koa-router')()
const forecast = require('koa-router')()

auth
	.get('/userInfo', User.getUserInfo)
	.post('/userInfo', User.updateUserInfo)
	.delete('/news/:type', User.newsToZero)
	.get('/user/search', User.search)

auth
	.put('/script', Scripts.addScript)
	.post('/script', Scripts.disableScript)
	.delete('/script', Scripts.deleteScript)

auth.put('/feedback', Feedback.addFeedback).get('/usagelog', Usagelog.refresh)

auth.put('/audio', Audio.recognition)

notice.post('/family', Notice.refuse).put('/family', Notice.agree)

fami
	.post('/family', Family.invite)
	.get('/family', Family.search)
	.put('/family', Family.create)
	.get('/name', Family.hasExisted)
	.put('/member', Family.join)
	.get('/member', Family.member)

electric
	.post('/bulb', Electric.updateBulb)
	.delete('/bulb', Electric.deleteBulb)
	.put('/bulb', Electric.addBulb)
	.patch('/bulb', Electric.renameBulb)
	.post('/bulbs', Electric.switchBulbs)
	.get('/bulbs', Electric.switchBulbsStatus)

forecast
	.get('/bulb', Electric.getServiceDataWithSingleBulb)
	.get('/bulbs', User.getServiceDataWithAllBulb)

// notice.get('/family')

auth.use('/family', fami.routes()).use(fami.allowedMethods())
auth.use('/notice', notice.routes()).use(notice.allowedMethods())
auth.use('/electric', electric.routes()).use(electric.allowedMethods())
auth.use('/forecast', forecast.routes()).use(forecast.allowedMethods())

module.exports = auth
