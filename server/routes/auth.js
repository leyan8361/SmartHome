const path = require('path')
const Common = require('../db/controller/common')

const auth = require('koa-router')()

auth.get('/captcha', verifyToken, Common.getCaptcha)
auth.get('/exist', verifyToken, User.hasExisted)
auth.post('/login', User.login)
auth.post('/registry', User.registry)

module.exports = auth
