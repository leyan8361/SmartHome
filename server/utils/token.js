/* tslint:disable */
const fs = require('fs')
const path = require('path')
const jwt = require('koa-jwt')

module.exports = {
	generateToken(data = this.name) {
		const created = Math.floor(Date.now() / 1000)
		const exp = created + 3600 * 24 * 30

		const cert = fs.readFileSync(path.resolve('config/rsa_private_key.pem'))
		const token = jwt.sign({ data, exp }, cert, { algorithm: 'RS256' })
		return token
	},
	verifyToken(token) {
		const cert = fs.readFileSync(path.resolve('config/rsa_public_key.pem'))
		const value = {}
		try {
			const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
			const { exp = 0 } = result
			const current = Math.floor(Date.now() / 1000)
			if (current <= exp) {
				value = result.data || {}
			}
		} catch (e) {
			if ('TokenExpiredError' === e.name) {
				ctx.sendError('token已过期, 请重新登录!')
				ctx.throw(401, 'token expired,请及时本地保存数据！')
			}
			ctx.sendError('token验证失败, 请重新登录!')
			ctx.throw(401, 'invalid token')
		}
		console.log('鉴权成功')
		return value
	}
}
