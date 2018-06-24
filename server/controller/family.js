const User = require('model/User')
const Family = require('model/Family')
const Notice = require('model/Notice')
const { writeImg } = require('utils/db/family')

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
			: ctx.sendError('因不可抗拒因素邀请失败！')
	},
	async hasExisted(ctx) {
		const { name } = ctx.request.query
		await Family.findOne({ name }, (err, data) => {
			if (err) {
				return ctx.sendError(err)
			}
			ctx.send('',{hasExisted: !!data})
		})
	},
	async create(ctx) {
		const account = ctx.state.user.data
		const family = ctx.request.body
		const isHad = await Family.findOne({ name:family.name })
		if (isHad) {
			return ctx.sendError('您的家庭名字已被人注册！')
		}

		family.founder = account
		if (!family.displayName) {
			family.displayName = family.name
		}
		await writeImg(family)

		const isSaveSuccess = await new Family(family).save()

		isSaveSuccess
			? ctx.send('创建成功！')
			: ctx.sendError('因不可抗拒因素创建失败！')
	}
}
