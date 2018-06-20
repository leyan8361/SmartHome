const Scripts = require('model/Scripts')
const {filterTime,filterDate} = require('utils/db/scripts')

module.exports = {
	async addScript(ctx) {
		const account = ctx.state.user.data
		const script = ctx.request.body

		script.startExec = filterTime(script.startExec)
		script.endExec = filterTime(script.endExec)

		if (script.endDuration && script.endDuration.length > 0) {
			script.endDuration = script.endDuration[0]
		}
		if (script.startDuration && script.startDuration.length > 0) {
			script.startDuration = script.startDuration[script.startDuration.length > 1 ? 1 : 0]
		}
		if (script.specificDuration && script.specificDuration.length > 1) {
			script.specificDuration.start = filterDate(script.specificDuration[0])
			script.specificDuration.end = filterDate(script.specificDuration[1])
		}

		const isSaveSuccess = new Scripts(script).save()
		if (!isSaveSuccess) {
			ctx.sendError('因不可抗拒因素，指令增加失败！')
		}
		ctx.send('指令增加成功！')
	}
}
