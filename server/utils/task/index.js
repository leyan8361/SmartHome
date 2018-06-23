const schedule = require('node-schedule')
const Tasks = require('schedule/tasks')

module.exports = {
	async generateTask(script) {
		const codition = {
			weather: script.weather,
			startExec: script.startExec,
			relation:script.relation
		}
		const duration = {
			start: script.startDuration,
			end: script.endDuration,
			specific:script.specificDuration
		}
		const job = {
			bulbs: script.ids,
			name:script.name,
			status: script.status,
			color: script.color,
			brightness: script.brightness
		}
		const indentify = {
			master:script.account,
			id: script.scriptID,
			address: script.address,
			disabled: false
		}
		await Tasks.add(job,codition, duration,indentify)
	},
	filterWeek(time) {
		if (!time) {
			return
		}
		let endTime
		switch (time) {
			case '每周一':
				endTime = 1
				break
			case '每周二':
				endTime = 2
				break
			case '每周三':
				endTime = 3
				break
			case '每周四':
				endTime = 4
				break
			case '每周五':
				endTime = 5
				break
			case '每周六':
				endTime = 6
				break
			case '每周日':
				endTime = 7
				break
		}
		return endTime
	},
	generateRule(time) {
		const rule = new schedule.RecurrenceRule()
		rule.hour = time.hour
		rule.minute = time.minute || time.minutes
		rule.second = time.second || 0
		return rule
	}
}
