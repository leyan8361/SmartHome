const Scripts = require('model/scripts')

module.exports = {
	async getScripts(account) {
		return Scripts.find({ master: account }, {_id:0,master:0})
	}
}
