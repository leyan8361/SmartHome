const { Power } = require('config/bulb')
module.exports = {
	filterConsumption(consumption) {
		let result = 0

		const { length } = consumption

		consumption[length] = {
			useTime:Date.now()
		}

		for (let i = 0; i < length; ++i){
			const time = Math.floor(consumption[i].useTime / 1000)
			const nextTime = Math.floor(consumption[i + 1].useTime / 1000)
			const useHour = (nextTime - time) / 3600
			const usePower = 100 / consumption[i].usageAmount

			result += Power * usePower * useHour
		}
		return result
	}
}
