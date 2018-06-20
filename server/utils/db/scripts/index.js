const Scripts = require('model/scripts')

module.exports = {
	async getScripts(account) {
		return Scripts.find({ master: account }, {_id:0,master:0})
	},
	filterTime(time) {
		if (!time) {
			return
		}
		const [hour,minutes,second] = time.split('T')[1].split('.')[0].split(':')
		return { hour,minutes,second }
	},
	filterDate(date) {
		if (!date) {
			return
		}
		const [year,month,day] = date.split('T')[0].split('-')
		return { year,month,day }
	}
}
