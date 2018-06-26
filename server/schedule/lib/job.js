const Electric = require('model/Electric')
const pubBulbs = require('utils/mqtt/pubBulbs')
const Usagelog = require('model/Usagelog')

module.exports = {
	Resolve({ bulbs, status, color, brightness,name }, account) {
		const usagelog = {
			name: '全部',
			id: '0',
			showStatus: status ? '开灯' : '关灯',
			master:account,
			status, color, brightness
		}

		const conditions = [{ master: account }]
		const ids = []
		if (!bulbs.includes('0')) {
			const or = { $or: [] }
			bulbs.forEach(async id => {
				ids.push(id)
				or.$or.push({ id })
			})
			conditions.push(or)

			usagelog.id = ids.join()
			usagelog.name = name.join()
		} else {
			ids.push('0')
		}

		const updateCondition = { $and: conditions }

		const usageAmount = status ? +brightness : 0
		const data = { useTime: Date.now(), usageAmount }

		return async function() {
			await Promise.all([
				pubBulbs(ids, { status, color, brightness }),
				Electric.updateMany(updateCondition, { status, color, brightness }),
				Electric.updateMany(updateCondition, { $push: { consumption: data } }),
				new Usagelog(usagelog).save()
			])
		}
	}
}
