const path = require('path')
const User = require('controller/user')
const Common = require('controller/common')

const api = require('koa-router')()

api
	.get('/captcha', Common.getCaptcha)
	.get('/exist', User.hasExisted)
	.post('/login', User.login)
	.post('/registry', User.registry)

module.exports = api
