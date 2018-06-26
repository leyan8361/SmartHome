const Electric = require('model/Electric')
const User = require('model/User')
const log = require('utils/log')
const { filterConsumption } = require('utils/consumption')
const moment = require('moment')

module.exports = async () => {
	const users = await User.find()
	moment.locale('zh-cn')

	if (!users || !users.length) {
		return
	}
	users.forEach(async user => {
		const bulbs = await Electric.find(
			{ master: user.account },
			{ consumption: 1 }
		)
		if (!bulbs || !bulbs.length) {
			return
		}
		let todayUsageAmount = bulbs.reduce((total, bulb) => {
			total += filterConsumption(bulb.consumption)
			return total
		}, 0)

		const data = {
			date: moment().subtract(1, 'day'),
			consumption: todayUsageAmount / 1000
		}
		await Promise.all([
			User.updateOne(
				{ account: user.account },
				{ $push: { electricity: data } }
			),
			Electric.updateMany({ master: user.account }, { consumption: [] })
		])
		log.success('电器使用电量统计完成！')
	})
}
