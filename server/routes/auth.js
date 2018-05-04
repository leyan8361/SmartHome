const path = require('path')
const Common = require('../controller/common')
const User = require('../controller/user')
const auth = require('koa-router')()

auth.get('/userInfo',User.getUserInfo)

module.exports = auth
