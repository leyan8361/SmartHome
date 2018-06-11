const Electric = require('../model/Electric')
module.exports = {
	async updateBulb(ctx) {
		const account = ctx.state.user.data
		const bulb = ctx.request.body

		const isSuccess = await Electric.updateOne({ $and: [{ master: account }, { id: bulb.id }] }, bulb)
		isSuccess ? ctx.send('状态信息更新成功！') : ctx.sendEror('状态消息因不可抗因素更新失败！')
	}
}
