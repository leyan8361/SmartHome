/* global Tasks:true */
const Scripts = require('model/Scripts')
const { filterTime, filterDate } = require('utils/db/scripts')
const { generateTask } = require('utils/task')
require('schedule/tasks')

module.exports = {
	async addScript(ctx) {
		const account = ctx.state.user.data
		const script = ctx.request.body

		script.master = account
		script.startExec = filterTime(script.startExec)

		if (script.startDuration && script.startDuration.length > 0) {
			script.startDuration =
				script.startDuration[script.startDuration.length > 1 ? 1 : 0]
			script.showDuration = script.startDuration
		}
		if (script.endDuration && script.endDuration.length > 0) {
			script.endDuration = script.endDuration[0]
			if (script.startDuration === script.endDuration) {
				return ctx.sendError('执行时间出现错误，不可选择相同的星期！')
			}
			script.showDuration += `至${script.endDuration}`
		}
		if (script.specificDuration && script.specificDuration.length > 1) {
			script.specificDuration.start = filterDate(script.specificDuration[0])
			script.specificDuration.end = filterDate(script.specificDuration[1])
			script.showDuration = `${Object.values(
				script.specificDuration.start
			).join('.')} 至 ${Object.values(script.specificDuration.end).join('.')}`
		}
		if (script.ids.includes('0')) {
			script.showName = '全部'
		} else {
			script.showName = script.name.join(',')
		}
		script.showStatus = script.status ? '开' : '关'
		script.showBrightness = `${script.brightness}%`

		let showWeather = ''
		if (script.weather && script.weather.length > 0) {
			showWeather = script.weather.join('或')
		}

		let showExecTime = ''
		if (script.startExec) {
			showExecTime = Object.values(script.startExec).join(':')
		}

		if (showWeather && showExecTime) {
			let showRelation = script.relation ? ' 且 ' : ' 或 '
			script.showCodition = showExecTime + showRelation + showWeather
		} else {
			script.showCodition = showExecTime ? showExecTime : showWeather
		}
		const [isSaveSuccess] = await Promise.all([
			new Scripts(script).save(),
			generateTask(script)
		])
		const scripts = await Scripts.find(
			{ master: account },
			{ master: 0, address: 0, _id: 0, _v: 0 }
		)
		if (!isSaveSuccess) {
			return ctx.sendError('因不可抗拒因素，指令增加失败！')
		}

		ctx.send('指令增加成功！', { scripts })
	},
	async disableScript(ctx) {
		const account = ctx.state.user.data
		const { scriptID, disabled } = ctx.request.body
		const isDisableSuccess = await Scripts.updateOne(
			{ $and: [{ master: account }, { scriptID }] },
			{ disabled: !disabled }
		)
		Tasks.disabledToggleById(scriptID)
		const showText = disabled ? '启用' : '禁用'
		if (!isDisableSuccess) {
			return ctx.sendError(`因不可抗拒因素，指令${showText}失败！`)
		}
		ctx.send(`指令${showText}成功！`)
	},
	async deleteScript(ctx) {
		const account = ctx.state.user.data
		const { scriptID } = ctx.request.query
		const isDeleteSuccess = await Scripts.deleteOne({
			$and: [{ master: account }, { scriptID }]
		})
		Tasks.deleteById(scriptID)
		if (!isDeleteSuccess) {
			return ctx.sendError('因不可抗拒因素，指令删除失败！')
		}
		ctx.send('指令删除成功！')
	}
}
