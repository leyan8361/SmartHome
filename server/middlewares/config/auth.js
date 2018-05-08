const jwt = require('jsonwebtoken')
const fs = require('fs')
const auth = require('../../../config/auth.json')
const koaJwt = require('koa-jwt')

module.exports = app => {
	const pub = fs.readFileSync('../config/rsa_public_key.pem')
	app.use(async (ctx, next) => {
		if (ctx.path.indexOf('/auth') >= 0) {
			const token = ctx.header.authorization
			if (!token) {
				ctx.sendError('请先登录！')
				return ctx.throw(401, 'token 获取失败, 请重新登录！')
			}
			try {
				const payload = await jwt.verify(token.split(' ')[1], pub)
			} catch (e) {
				if ('TokenExpiredError' === e.name) {
					ctx.sendError('token已过期, 请重新登录！')
					ctx.throw(401, 'token expired,请及时本地保存数据！')
				}
				ctx.sendError('token验证失败, 请重新登录！')
				ctx.throw(401, 'invalid token')
			}
			console.log('鉴权成功')
		}
		await next()
	})
	app.use(koaJwt({ secret: pub }).unless({ path: [/^\/api\//] }))
}
