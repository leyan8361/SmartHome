
const path = require('path')
const User = require('../db/controller/user')
const Common = require('../db/controller/common')

const api = require('koa-router')()

api.get('/captcha', Common.getCaptcha)
api.get('/exist', User.hasExisted)
api.post('/login', User.login)
api.post('/registry', User.registry)

module.exports = api
