const User = require('../model/User')
const Token = require('../../utils/token')

module.exports =  {

	async login(ctx) {
		const { account,password } = ctx.request.body
		const user = await User.findOne({ account: account })
		if (!user) {
			return (ctx.body = {
				success: false,
				message: '用户不存在！'
			})
		}
		const isMatch = await user.comparePassword(password, user.password)
		if (!isMatch) {
			return (ctx.body = {
				success: false,
				message: '密码错误！'
			})
		}
		const token = await Token.generate(account)
		const userInfo = {
			name: user.name,
			account: user, account,
			address:user.address
		}
		ctx.body = {
			success: true,
			token,
			userInfo,
			message:'登录成功！'
		}
	},

	async registry(ctx) {
		const userInfo = ctx.request.body
		console.log(userInfo)
		if (ctx.session.captcha != userInfo.captcha) {
			console.log('验证码错误')
			return (ctx.body = {
				success: false,
				message: '验证码错误！'
			})
		}
		const isHad = await User.findOne({ account: userInfo.account })
		if (isHad) {
			return (ctx.body = {
				success: false,
				message: '账号已存在！'
			})
		}
		delete userInfo.captcha
		delete userInfo.checkpass
		const hasSaved = await new User(userInfo).save()
		if (!hasSaved) {
			return (ctx.body = {
				success: false,
				message:'因不可抗拒因素，注册失败！'
			})
		}
		return (ctx.body = {
			success: true,
			message:'注册成功！'
		})
	},

	async hasExisted(ctx) {
		const { account } = ctx.request.query
		await User.findOne({ account:account }, (err, data) => {
			if (err) {
				return ctx.body = {
					success: false,
					message: err
				}
			}
			return (ctx.body = {
				success: true,
				hasExisted: !!data,
			})
		})
	}
}
