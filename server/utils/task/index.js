const schedule = require('node-schedule')

module.exports = {
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
