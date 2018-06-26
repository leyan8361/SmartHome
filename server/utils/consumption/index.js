const { power } = require('config/bulb')
module.exports = {
	filterConsumption(consumption) {
		consumption[consumption.length].useTime = Date.now()
		const Power = Number.parseInt(power)
		return consumption.reduce((total,currValue,currIndex) => {
			const time = Math.floor(currValue.useTime / 1000)
			const nextTime = Math.floor(consumption[currIndex + 1].useTime / 1000)
			const useHour = (nextTime - time) / 3600
			const usePower = 100 / currValue.usageAmount
			total += Power * usePower * useHour
			return total
		},0)
	}
}
