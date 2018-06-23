const User = require('model/User')
const Family = require('model/Family')
const Notice = require('model/Notice')
module.exports = {
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
	}
}
