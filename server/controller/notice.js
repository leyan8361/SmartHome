const Notice = require('model/Notice')
module.exports = {
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
