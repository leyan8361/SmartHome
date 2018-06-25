const Notice = require('model/Notice')
const Family = require('model/Family')
const User = require('model/User')

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
			: ctx.sendError('因不可抗拒因素拒绝失败！')
	},
	async agree(ctx) {
		const { receiver, sender, id,families } = ctx.request.body
		const showFamilies = families.map(e=>e.displayName).join('、')

		const noticeInfo = {
			sender,
			receiver,
			type: 'family',
			system: true,
			sysMessage: {
				sender: `${sender.name} 已同意了您的邀请`,
				receiver: `您已同意了${receiver.name}的家庭邀请，已加入${showFamilies}家庭`
			},
			id: Date.now().toString()
		}

		const [isSaveSuccess] = await Promise.all([
			new Notice(noticeInfo).save(),
			Notice.updateOne({ id }, { status: '已加入' })
		])
		const syncFuncs = []
		families.forEach(family => {
			syncFuncs.push(Family.updateOne({ name:family.name }, { $push: { users: sender } }))
			syncFuncs.push(User.updateOne({ account:sender.account }, { $push: { families: family } }))
		})
		await Promise.all(syncFuncs)

		isSaveSuccess
			? ctx.send('已成功加入！')
			: ctx.sendError('因不可抗拒因素加入失败！')
	}
}
