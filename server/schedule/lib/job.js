const Electric = require('model/Electric')
const pubBulbs = require('utils/mqtt/pubBulbs')

module.exports = {
	Resolve({ bulbs, status, color, brightness }, account) {
		const conditions = [{ master: account }]
		const ids = []
		if (!bulbs.includes('0')) {
			const or = { $or: [] }
			bulbs.forEach(id => {
				ids.push(id)
				or.$or.push({ id })
			})
			conditions.push(or)
		} else {
			ids.push('0')
		}

		return async function() {
			await Promise.all([
				pubBulbs(ids, { status, color, brightness }),
				Electric.updateMany({ $and: conditions }, { status, color, brightness })
			])
		}
	}
}
