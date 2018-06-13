const Electric = require('model/Electric')

module.exports = {
	async getElectrics(account) {
		return Electric.find({ master: account }, {_id:0,master:0})
	}
}
