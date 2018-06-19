const Client = require('utils/mqtt')

module.exports = async (ids, { status, color, brightness }) => {
	if (!ids.includes('0')) {
		return ids.forEach(id => {
			let payload = `${id},${status ? '开灯' : '关灯'},${color},${brightness}`
			Client.publish('bulb', payload)
		})
	}

	let payload = `0,${status ? '开灯' : '关灯'},${color},${brightness}`
	Client.publish('bulb', payload)
}
