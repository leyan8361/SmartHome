const User = require('../model/User')
const Token = require('../utils/token')

module.exports =  {

	async login(ctx) {
		const { account,password } = ctx.request.body
		const user = await User.findOne({ account: account })
		if (!user) {
			return ctx.sendError('用户不存在！')
		}
		const isMatch = await user.comparePassword(password, user.password)
		if (!isMatch) {
			return ctx.sendError('密码错误！')
		}
		const token = await Token.generate(account)
		const userInfo = {
			name: user.name,
			account: user.account,
			adress: user.address,
			avatar: user.avatar
		}
		ctx.send('登录成功！',{token, userInfo})
	},

	async registry(ctx) {
		const userInfo = ctx.request.body
		if (ctx.session.captcha != userInfo.captcha) {
			return ctx.sendError('验证码错误！')
		}
		const isHad = await User.findOne({ account: userInfo.account })
		if (isHad) {
			return ctx.sendError('账号已存在！')
		}
		delete userInfo.captcha
		delete userInfo.checkpass

		const hasSaved = await new User(userInfo).save()
		if (!hasSaved) {
			return ctx.sendError('因不可抗拒因素，注册失败！')
		}
		ctx.send('注册成功！')
	},

	async hasExisted(ctx) {
		const { account } = ctx.request.query
		await User.findOne({ account:account }, (err, data) => {
			if (err) {
				return ctx.sendError(err)
			}
			ctx.send('',{hasExisted: !!data})
		})
	},

	async getUserInfo(ctx) {
		console.log(ctx.state.user)
		const user = await User.findOne({ account: ctx.state.user.data })
		if (!user) {
			ctx.sendError('用户不存在！')
			return ctx.throw(401, '信息获取失败, 请重新登录！')

		}
		const userInfo = {
			name: user.name,
			account: user.account,
			address: user.address,
			avatar: user.avatar
		}
		ctx.send('信息获取成功！',{userInfo})
	}
}
