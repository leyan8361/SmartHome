const Electric = require('model/Electric')
const Client = require('utils/mqtt')

module.exports = {
	async updateBulb(ctx) {

		const account = ctx.state.user.data
		const bulb = ctx.request.body

		const { status, color, brightness } = bulb

		/* REVIEW: 目前传输数据：状态，亮度，颜色 */
		let payload = `${status ? '开灯' : '关灯'},${color},${brightness}`

		const [,isDBSuccess] = await Promise.all([
			Client.publish('bulb', payload),
			Electric.updateOne({ $and: [{ master: account }, { id: bulb.id }] }, bulb)
		])

		isDBSuccess ? ctx.send('状态信息更新成功！') : ctx.sendError('状态消息因不可抗因素更新失败！')
	}
}
