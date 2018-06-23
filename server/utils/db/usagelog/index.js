const Usagelog = require('model/Usagelog')

module.exports = {
	async getUsagelog(account) {
		const usagelogs = await Usagelog.find({ master: account }, { _id: 0, master: 0 }).sort({createdAt:-1})
		return usagelogs
	}
}
