require('module-alias/register')
const { Recognize } = require('utils/audio')
const Client = require('utils/mqtt')

module.exports = {
	async recognition(ctx) {
		const account = ctx.state.user.data
		const { audio } = ctx.request.body
		const file = audio.split(',')[1]

		const result = await Recognize(Buffer.from(file))

		if (result.desc !== 'success') {
			return ctx.sendError(result.desc)
		}
		const word = result.data
		/* TODO: 根据 word中的关键字做判断,然后操作指令 */
		if (
			(word.includes('所有灯') || word.includes('全部灯')) &&
			(word.includes('打开') || word.includes('开启'))
		) {
			const payload = '0,开灯'

			await Client.publish('bulb', payload)
		}
		ctx.send('开灯成功!')
	}
}
