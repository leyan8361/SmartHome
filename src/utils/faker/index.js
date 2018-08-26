import moment from 'moment'

/**
 * 	serviceData: [
			{
				usageTime: {
					type: Number,
					required: false,
				},
				usageAmount: {
					type: Number,
					required: false,
					min: 0,
					default: 100
				},
				usageDate: {
					type: String,
					required: false
				},
				usageRate: {
					type: Number,
					required: false,
					min: 0,
					default: 0.5
				}
			}
		]


 */

function generatorSingleBulb(count = 30) {
	moment.locale('zh-cn')

	const data = []
	for (let i = count; i >= 0; --i) {
		const bulb = {}
		bulb.usageTime = (3 + Math.random() * 2).toFixed(1)
		bulb.usageAmount = (
			60 * (0.1 + Math.random()) * bulb.usageTime /
			1000
		).toFixed(2)
		bulb.usageRate = Math.random().toFixed(2)
		bulb.usageDate = moment()
			.subtract(i, 'days')
			.format('YYYY-MM-DD')

		data.push(bulb)
	}
	return data
}

function generatorAllBulb(count = 30,bulbCount = 3) {
	moment.locale('zh-cn')
	const data = []
	for (let i = count; i >= 0; --i) {
		const bulb = {}
		bulb.usageTime = (3 + Math.random() * 2).toFixed(1) * bulbCount
		bulb.usageAmount = (
			60 * (0.1 + Math.random()) * bulb.usageTime /
			1000
		).toFixed(2) * bulbCount
		bulb.usageDate = moment()
			.subtract(i, 'days')
			.format('YYYY-MM-DD')

		data.push(bulb)
	}
	return data
}

export default{
	getSingleBulbData: generatorSingleBulb,
	getAllBulbData: generatorAllBulb
}
