const moment = require('moment')

module.exports = {
	getYesterday() {
		moment.locale('zh-cn')
		return moment().subtract(1, 'days').format('YYYY-MM-DD')
	}
}
