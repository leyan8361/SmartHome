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

		const isSaveSuccess = await new Notice(noticeInfo).save()

		isSaveSuccess
			? ctx.send('邀请成功！')
			: ctx.sendError('因不可抗拒因素邀请失败！')
	},
	async search(ctx) {
		const { name } = ctx.request.query
		const family = await Family.findOne({ name })
		family
			? ctx.send('查找成功！', { family })
			: ctx.sendError('不存在该家庭！')
	},
	async hasExisted(ctx) {
		const { name } = ctx.request.query
		const family = await Family.findOne({ name })
		ctx.send('', { hasExisted: !!family })
	},
	async create(ctx) {
		const account = ctx.state.user.data
		const family = ctx.request.body
		const { name } = family
		const isHad = await Family.findOne({ name })
		if (isHad) {
			return ctx.sendError('您的家庭名字已被人注册！')
		}

		family.founder = account
		if (!family.displayName) {
			family.displayName = name
		}

		family.avatar = await writeImg(family)

		const [isSaveSuccess] = await Promise.all([
			new Family(family).save(),
			User.updateOne(
				{ account, families: { $ne: name } },
				{ $push: { families: name } }
			)
		])

		isSaveSuccess
			? ctx.send('创建成功！')
			: ctx.sendError('因不可抗拒因素创建失败！')
	},
	async join(ctx) {
		const { message, sender, receiver } = ctx.request.body
		const { account } = sender
		const { family } = receiver

		const notice = {
			sender,
			message,
			receiver,
			type: 'family',
			id: Date.now().toString()
		}
		const [{ admins, founder }] = await Promise.all([
			// 找到家庭中的管理层的账号
			Family.findOne({ family }, { admins: 1, founder: 1 }),

			// 把当前用户加入到家庭的用户组
			Family.updateOne(
				{ family, users: { $ne: account } },
				{ $push: { users: account } }
			),

			//用户的家庭组中增加 加入的家庭名
			User.updateOne(
				{ account, families: { $ne: family } },
				{ $push: { families: family } }
			),

			// 用户消息通知中增加消息
			new Notice(notice).save()
		])

		//管理层的用户汇集
		admins.push(founder)

		// 找到所有管理层的用户的名字与账号，模拟 收到消息者的格式
		const managers = await User.find(
			{ account: { $in: admins } },
			{ name: 1, account: 1 }
		)

		// 异步发布消息数组
		const syncFunc = []
		managers.forEach(receiver => {
			const noticeInfo = {
				sender,
				receiver,
				message,
				type: 'family',
				id: Date.now().toString()
			}
			syncFunc.push(new Notice(noticeInfo).save())
		})
		await Promise.all(syncFunc)

		ctx.send('加入成功，等待管理员的审核！')
	}
}
