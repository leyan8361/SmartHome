const User = require('model/User')
const Family = require('model/Family')
const Notice = require('model/Notice')
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
		const { message,receiver,sender } = ctx.request.body
		const noticeInfo = { sender, receiver, message, type:'family' }

		await Promise.all([User.updateOne({ account: receiver.account }, { $inc: { 'news.family': 1 } }),new Notice(noticeInfo).save()])

		ctx.send('邀请成功！')
	}
}
