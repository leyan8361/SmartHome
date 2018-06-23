const User = require('model/User')
const Family = require('model/Family')
const Notice = require('model/Notice')
module.exports = {
	async search(ctx) {
		const { account } = ctx.request.query
		const user = await User.findOne({ account: account })
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
			user.private.forEach(e => {
				result[e] = null
			})
		}
		ctx.send('查找成功！', result)
	},
	async invite(ctx) {
		const { message, receiver, sender } = ctx.request.body
		const noticeInfo = {
			sender,
			receiver,
			message,
			type: 'family',
			id: Date.now().toString()
		}

		const isSaveSuccess = new Notice(noticeInfo).save()

		isSaveSuccess
			? ctx.send('邀请成功！')
			: ctx.sendError('因不可抗拒因素保存失败！')
	},
	async refuse(ctx) {
		const { receiver, sender, id } = ctx.request.body

		const noticeInfo = {
			sender,
			receiver,
			type: 'family',
			system: true,
			sysMessage: {
				sender: `${sender.name} 已拒绝了您的邀请`,
				receiver: `您已拒绝了${receiver.name}的邀请`
			},
			id: Date.now().toString()
		}

		const [isSaveSuccess] = await Promise.all([
			new Notice(noticeInfo).save(),
			Notice.updateOne({ id }, { status: '已拒绝' })
		])

		isSaveSuccess
			? ctx.send('已成功拒绝！')
			: ctx.sendError('因不可抗拒因素保存失败！')
	}
}
