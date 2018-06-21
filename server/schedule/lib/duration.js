const schedule = require('node-schedule')
const { filterWeek } = require('utils/task')

module.exports = {
	ResolveSpecific(specific) {

		const time = new Date()
		const year = time.getFullYear()
		const mouth = time.getMonth() + 1
		const day = time.getDate()

		if (
			year < Number.parseInt(specific.start.year, 10) ||
			year > Number.parseInt(specific.end.year, 10)
		) {
			return false
		}
		if (
			year === Number.parseInt(specific.end.year, 10) &&
			mouth > Number.parseInt(specific.end.mouth, 10)
		) {
			return false
		}
		if (
			year === Number.parseInt(specific.start.year, 10) &&
			mouth < Number.parseInt(specific.start.mouth, 10)
		) {
			return false
		}
		if (
			year === Number.parseInt(specific.end.year, 10) &&
			mouth === Number.parseInt(specific.end.mouth, 10) &&
			day > Number.parseInt(specific.end.day, 10)
		) {
			return false
		}
		if (
			year === Number.parseInt(specific.start.year, 10) &&
			mouth === Number.parseInt(specific.start.mouth, 10) &&
			day < Number.parseInt(specific.start.day, 10)
		) {
			return false
		}
		return true
	},
	ResolveDuration({ start,end }) {
		const time = new Date()
		if (end) {
			start = filterWeek(start)
			end = filterWeek(end)
			const day = time.getDay()
			if (day < start && day > end) {
				return false
			}
		}
		return true
	}
}
