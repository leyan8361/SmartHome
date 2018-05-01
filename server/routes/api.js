
const path = require('path')
const User = require('../db/controller/user')

const api = require('koa-router')()

api.get('/captcha', User.getCaptcha)
api.post('/login', User.login)
api.post('/registry', User.registry)

module.exports = api
