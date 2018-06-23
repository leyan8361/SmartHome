const User = require('controller/user')
const Family = require('controller/family')
// const Notice = require('controller/notice')
const Electric = require('controller/electric')
const Usagelog = require('controller/usagelog')
const Scripts = require('controller/scripts')
const Feedback = require('controller/feedback')

const auth = require('koa-router')()
const fami = require('koa-router')()
// const notice = require('koa-router')()
const electric = require('koa-router')()

auth
	.get('/userInfo', User.getUserInfo)
	.post('/userInfo', User.updateUserInfo)
	.delete('/news/:type', User.newsToZero)

auth
	.put('/script', Scripts.addScript)
	.post('/script', Scripts.disableScript)
	.delete('/script', Scripts.deleteScript)

auth.put('/feedback', Feedback.addFeedback).get('/usagelog',Usagelog.refresh)

fami.
	get('/userInfo', Family.search).
	put('/invite', Family.invite).
	post('/invite', Family.refuse)

electric
	.post('/bulb', Electric.updateBulb)
	.delete('/bulb', Electric.deleteBulb)
	.put('/bulb', Electric.addBulb)
	.patch('/bulb', Electric.renameBulb)
	.post('/bulbs', Electric.switchBulbs)
	.get('/bulbs', Electric.switchBulbsStatus)

// notice.get('/family')

auth.use('/family', fami.routes()).use(fami.allowedMethods())
auth.use('/electric', electric.routes()).use(electric.allowedMethods())

module.exports = auth
