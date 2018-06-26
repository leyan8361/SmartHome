const Electric = require('model/Electric')
const Client = require('utils/mqtt')
const pubBulbs = require('utils/mqtt/pubBulbs')
const Usagelog = require('model/Usagelog')
const { getUsagelog } = require('utils/db/usagelog')

module.exports = {
	async updateBulb(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body

		const { id, status, color, brightness } = bulb

		const showStatus = status ? '开灯' : '关灯'
		let payload = `${id},${showStatus},${color},${brightness}`

		const usagelog = { ...bulb, showStatus, master: account }

		const codition = { $and: [{ master: account }, { id: bulb.id }] }

		const usageAmount = status ? +brightness : 0
		const data = { useTime: Date.now(), usageAmount }

		const [, isDBSuccess] = await Promise.all([
			Client.publish('bulb', payload),
			Electric.updateOne(codition, bulb),
			Electric.updateOne(codition, { $push: { consumption: data } }),
			new Usagelog(usagelog).save()
		])
		const usagelogs = await getUsagelog(account)

		isDBSuccess
			? ctx.send('状态信息更新成功！', { usagelogs })
			: ctx.sendError('状态消息因不可抗因素更新失败！')
	},
	async switchBulbs(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body

		const { status, color, brightness, ids: bulbs, name } = bulb
		Reflect.deleteProperty(bulb, 'ids')
		Reflect.deleteProperty(bulb, 'name')
		const usagelog = {
			name: '全部',
			id: '0',
			showStatus: status ? '开灯' : '关灯',
			master: account,
			status,
			color,
			brightness
		}

		const conditions = [{ master: account }]
		const ids = []
		if (!bulbs.includes('0')) {
			const or = { $or: [] }
			bulbs.forEach(id => {
				ids.push(id)
				or.$or.push({ id })
			})
			conditions.push(or)
			usagelog.id = ids.join()
			usagelog.name = name.join()
		} else {
			ids.push('0')
		}

		const updateCodition = { $and: conditions }

		const usageAmount = status ? +brightness : 0
		const data = { useTime: Date.now(), usageAmount }

		const [, isDBSuccess] = await Promise.all([
			pubBulbs(ids, { status, color, brightness }),
			Electric.updateMany(updateCodition, bulb),
			Electric.updateMany(updateCodition, { $push: { consumption: data } }),
			new Usagelog(usagelog).save()
		])

		const usagelogs = await getUsagelog(account)

		if (isDBSuccess) {
			ctx.send('状态更新成功！', { usagelogs })
		} else {
			ctx.sendError('因不可抗因素修改失败！')
		}
	},
	async switchBulbsStatus(ctx) {
		const account = ctx.state.user.data
		const status = ctx.request.query.status === 'true'

		const showStatus = status ? '开灯' : '关灯'

		const usagelog = {
			name: '全部',
			id: '0',
			master: account,
			status,
			showStatus
		}

		const [isDBSuccess, bulbs] = await Promise.all([
			Electric.updateMany({ master: account }, { status }),
			Electric.find({ master: account }),
			new Usagelog(usagelog).save()
		])

		const syncFuncs = [getUsagelog(account)]
		bulbs.forEach(bulb => {
			const payload = `0,${showStatus},${bulb.color},${bulb.brightness}`

			const usageAmount = status ? +bulb.brightness : 0
			const data = { useTime: Date.now(), usageAmount }

			syncFuncs.push(
				Electric.updateOne(
					{ master: account },
					{ $push: { consumption: data } }
				)
			)
			syncFuncs.push(Client.publish('bulb', payload))
		})
		const [usagelogs] = await Promise.all(syncFuncs)

		if (isDBSuccess) {
			ctx.send(`电器${showStatus}成功！`, { usagelogs })
		} else {
			ctx.sendError('因不可抗因素修改失败！')
		}
	},
	async deleteBulb(ctx) {
		const account = ctx.state.user.data
		const { id } = ctx.query
		const isSuccess = await Electric.deleteOne({
			$and: [{ master: account }, { id }]
		})
		isSuccess ? ctx.send('删除成功') : ctx.sendError('因不可抗因素删除失败！')
	},
	async renameBulb(ctx) {
		const account = ctx.state.user.data
		const { name, id } = ctx.request.body
		const isSuccess = await Electric.updateOne(
			{ $and: [{ master: account }, { id }] },
			{ name }
		)
		isSuccess
			? ctx.send('重命名成功')
			: ctx.sendError('因不可抗因素重命名失败！')
	},
	async addBulb(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body
		const { id, showStatus, color, brightness } = bulb

		const payload = `${id},${showStatus},${color},${brightness}`
		const [isSaveSuccess] = await Promise.all([
			new Electric({ ...bulb, master: account }).save(),
			Client.publish('bulb', payload)
		])

		if (isSaveSuccess) {
			ctx.send('电器增加成功！')
		} else {
			ctx.sendError('因不可抗因素增加失败！')
		}
	}
}
