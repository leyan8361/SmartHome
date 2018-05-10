const User = require('../model/User')
const Notice = require('../model/Notice')
const Token = require('../utils/token')
const writeImg = require('../db/utils/writeImg')
const bcrypt = require('bcryptjs')
const { SALT_WORK_FACTOR } = require('../../config/auth')
const filterNotice = require('../db/utils/filterNotice')
module.exports =  {

	async login(ctx) {
		const { account,password } = ctx.request.body
		const user = await User.findOne({ account: account })
		if (!user) {
			return ctx.sendError('用户不存在！')
		}
		console.log(user)
		const isMatch = await user.comparePassword(password, user.password)
		if (!isMatch) {
			return ctx.sendError('密码错误！')
		}
		const token = await Token.generate(account)
		const userInfo = {
			name: user.name,
			account: user.account,
			address: user.address,
			avatar: user.avatar,
			news: user.news
		}
		const value = { token,userInfo }
		/* 获取消息集合中对应的数据 */
		const notice = await Notice.find({ $or: [{ receiver: account }, { sender: account }] })
		value.notice = filterNotice(notice,account)
		ctx.send('登录成功！',value)
	},

	async getUserInfo(ctx) {
		const account = ctx.state.user.data
		const user = await User.findOne({ account: account })
		const userInfo = {
			name: user.name,
			account: user.account,
			address: user.address,
			avatar: user.avatar,
			news: user.news
		}
		const value = { userInfo }
		const notice = await Notice.find({ $or: [{ receiver: account }, { sender: account }] })
		value.notice = filterNotice(notice,account)
		console.log(value)
		ctx.send('信息获取成功！',value)
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

	async updateUserInfo(ctx) {
		const account = ctx.state.user.data
		const userInfo = ctx.request.body
		console.log('发送数据~')
		if (userInfo.avatar) {
			userInfo.account = account
			writeImg(userInfo)
		}
		let token
		if (userInfo.password) {
			userInfo.password = bcrypt.hashSync(userInfo.password, bcrypt.genSaltSync(Number.parseInt(SALT_WORK_FACTOR)))
			token = await Token.generate(account)
		}
		const isUpdated = await User.updateOne({ account }, userInfo)
		if (!isUpdated) {
			return ctx.sendError('因不可抗拒因素，您的信息更改失败！')
		}
		ctx.send('您的信息已更改成功！',{token})
	}
}
