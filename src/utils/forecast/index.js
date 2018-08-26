import tensorflow from '@/tensorflow'

export default {
	fcSingleBulb(singleBulb) {
		const usageTotalTime = singleBulb.reduce((total, curr) => {
			return total + Number.parseFloat(curr.usageTime)
		}, 0)
		const result = tensorflow(Math.floor(usageTotalTime))
		return Number.parseInt(String(result).slice(14)) / 10
	},
	fcAllBulb(allBulb) {
		const useageTotalAmount = allBulb.reduce((total, curr) => {
			return total + Number.parseFloat(curr.usageAmount)
		}, 0)
		return Math.floor(useageTotalAmount)
	}
}
