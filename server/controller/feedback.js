const Feedback = require('model/Feedback')

module.exports = {
	async addFeedback(ctx) {
		const account = ctx.state.user.data
		const feedback = ctx.request.body
		feedback.account = account

    await new Feedback(feedback).save()

		ctx.send('意见反馈成功！')
	}
}
