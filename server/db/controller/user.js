const MUser = require('../model/User')
const svgCaptcha = require('svg-captcha')
const jwt = require('koa-jwt')

class User {
	async getCaptcha(ctx) {
		const cpatcha = await svgCaptcha.createMathExpr({
			noise: 2,
			fontSize: 35,
			height: 40,
			width: 80
		})
		ctx.session.cpatcha = cpatcha.text
		ctx.type = 'svg'
		ctx.body = cpatcha.data
	}
	async login(ctx) {
		// 查找是否存在当前用户
		const { account, password } = ctx.request.body
		const user = await MUser.findOne({ account: account })
		if (!user) {
			ctx.body = {
				success: false,
				message: '当前用户不存在'
			}
		}
		ctx.body = ctx.query.account
	}
	async registry(ctx) {
		if (ctx.cookies.get('captcha') !== ctx.session.captcha) {
			ctx.throw(422, '验证码错误')
		}
	}
}

module.exports = new User()
