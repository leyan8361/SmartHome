const Electric = require('model/Electric')
const Client = require('utils/mqtt')
const pubBulbs = require('utils/mqtt/pubBulbs')

module.exports = {
	async updateBulb(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body

		const { id, status, color, brightness } = bulb

		/* REVIEW: 目前传输数据：状态，亮度，颜色 */
		let payload = `${id},${status ? '开灯' : '关灯'},${color},${brightness}`

		const [, isDBSuccess] = await Promise.all([
			Client.publish('bulb', payload),
			Electric.updateOne({ $and: [{ master: account }, { id: bulb.id }] }, bulb)
		])

		isDBSuccess
			? ctx.send('状态信息更新成功！')
			: ctx.sendError('状态消息因不可抗因素更新失败！')
	},
	async switchBulbs(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body

		const { status, color, brightness, selectBulbs: bulbs } = bulb

		const conditions = [{ master: account }]
		const ids = []
		if (!bulbs.includes('0')) {
			const or = { $or: [] }
			bulbs.forEach(id => {
				ids.push(id)
				or.$or.push({ id })
			})
			conditions.push(or)
		} else {
			ids.push('0')
		}

		Reflect.deleteProperty(bulb, 'selectBulbs')

		const [, isDBSuccess] = await Promise.all([
			pubBulbs(ids, { status, color, brightness }),
			Electric.updateMany({ $and: conditions }, bulb)
		])

		if (isDBSuccess) {
			ctx.send('状态更新成功！')
		} else {
			ctx.sendError('因不可抗因素修改失败！')
		}
	},
	async switchBulbsStatus(ctx) {
		const account = ctx.state.user.data
		const status = ctx.request.query.status === 'true'

		const showStatus = status ? '开灯' : '关灯'

		const payload = `0,${showStatus}`
		const [, isDBSuccess] = await Promise.all([
			Client.publish('bulb', payload),
			Electric.updateMany({ master: account }, { status })
		])

		if (isDBSuccess) {
			ctx.send(`电器${showStatus}成功！`)
		} else {
			ctx.sendError('因不可抗因素修改失败！')
		}
	},
	async deleteBulb(ctx) {
		const account = ctx.state.user.data
		const { id } = ctx.query
		const isSuccess = await Electric.deleteOne({ $and: [{ master: account }, { id }] })
		isSuccess ? ctx.send('删除成功') : ctx.sendError('因不可抗因素删除失败！')
	},
	async renameBulb(ctx) {
		const account = ctx.state.user.data
		const {name,id} = ctx.request.body
		const isSuccess = await Electric.updateOne({ $and: [{ master: account }, { id }] }, {name})
		isSuccess ? ctx.send('重命名成功') : ctx.sendError('因不可抗因素重命名失败！')
	},
	async addBulb(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body
		const {id,showStatus,color,brightness} = bulb

		const isSaveSuccess = await new Electric({ ...bulb, master: account }).save()

		const payload = `${id},${showStatus},${color},${brightness}`
		await Client.publish('bulb', payload)

		if (isSaveSuccess) {
			ctx.send('电器增加成功！')
		} else {
			ctx.sendError('因不可抗因素增加失败！')
		}
	}
}
