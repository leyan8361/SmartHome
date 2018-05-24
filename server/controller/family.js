const User = require('../model/User')
const Family = require('../model/Family')
const Notice = require('../model/Notice')
module.exports = {
	async search(ctx) {
		const { account } = ctx.request.query
		const user = await User.findOne({ account:account })
		if (!user) {
			return ctx.sendError('用户不存在！')
		}
		const result = {
			name: user.name,
			account: user.account,
			address: user.address,
			avatar: user.avatar
		}
		if (user.private.length > 0) {
			user.private.forEach(e => { result[e] = null })
		}
		ctx.send('查找成功！',result)
	},
	async invite(ctx) {
		const sender = ctx.state.user.data
		const { message,receiver } = ctx.request.body
		const type = 'family'
		const noticeInfo = {
			sender,
			receiver,
			message,
			type
		}
		const hasSaved = await new Notice(noticeInfo).save()
		if (!hasSaved) {
			return ctx.sendError('因不可抗拒因素，消息发送失败！')
		}
		await User.updateOne({ account: receiver }, { $inc: { 'news.family': 1 } })
		ctx.send('邀请成功！')
	}
}
