const Electric = require('model/Electric')
const User = require('model/User')

const log = require('utils/log')
const { filterConsumption } = require('utils/consumption')
const time = require('utils/time')

module.exports = async () => {
	const users = await User.find()

	users.forEach(async user => {
		const bulbs = await Electric.find(
			{ master: user.account },
			{ consumption: 1 }
		)
		if (!bulbs || !bulbs.length) {
			return
		}
		try {
			let todayUsageTime = 0
			const todayUsageData = []

			const todayUsageAmount = bulbs.reduce((total, bulb) => {
				const serviceData = filterConsumption(bulb.consumption)
				serviceData.usageDate = time.getYesterday()
				todayUsageData.push(serviceData)
				todayUsageTime += serviceData.usageTime
				return total + serviceData.usageAmount
			}, 0)

			bulbs.forEach(async (bulb, idx) => {
				todayUsageData[idx].usageRate =
					(todayUsageData[idx].usageTime / todayUsageTime).toFixed(2)

				await Electric.updateOne(
					{ master: user.account, id: bulb.id },
					{ $push: { serviceData: todayUsageData[idx] } }
				)
			})

			const electricity = {
				usageDate: time.getYesterday(),
				usageAmount: (todayUsageAmount / 1000).toFixed(2),
				usageTime: todayUsageTime.toFixed(1)
			}
			await Promise.all([
				User.updateOne({ account: user.account }, { $push: { electricity } }),
				Electric.updateMany({ master: user.account }, { consumption: [] })
			])
			log.success('电器使用电量统计完成！')
		} catch (error) {
			await Electric.updateMany({ master: user.account }, { consumption: [] })
			log.error('统计电量功能出现问题')
		}
	})
}
