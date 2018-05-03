const svgCaptcha = require('svg-captcha')

class Common {
	async getCaptcha(ctx) {
		const captcha = await svgCaptcha.createMathExpr({
			noise: 2,
			fontSize: 35,
			height: 40,
			width: 80
		})
		ctx.session.captcha = captcha.text
		console.log(ctx.session.captcha)
		ctx.body = { success: true, captcha: captcha.data }
	}
}

module.exports = new Common()
