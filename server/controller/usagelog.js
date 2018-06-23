const Usagelog = require('model/Usagelog')
const { getUsagelog } = require('utils/db/usagelog')

module.exports = {
	async refresh(ctx) {
		const account = ctx.state.user.data
		const usagelogs = await getUsagelog(account)
		if (!usagelogs) {
			return ctx.sendError('因不可抗拒因素，操作日志获取失败')
		}
		ctx.send('操作日志获取成功！', {usagelogs})
	}
}
