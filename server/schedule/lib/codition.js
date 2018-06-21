const { generateRule } = require('utils/task')
const schedule = require('node-schedule')
const { getWeather, isSunnyorCloudy, getSunMoveTime } = require('utils/http')

module.exports = {
	ResolveExec(startExec) {
		if (startExec && Object.values(startExec).length !== 0) {
			return generateRule(startExec)
		}
	},
	async ResolveWeather(weather,address) {
		const rules = []

		const weatherInfo = await getWeather(address)

		const isContainSunny = weather.includes('晴天')
		const isContainCloudy = weather.includes('阴天')
		if (isContainCloudy || isContainSunny) {
			const weatherStatus = isSunnyorCloudy(weatherInfo)
			if (
				weatherStatus && isContainSunny ||
				!weatherStatus && isContainCloudy
			) {
				rules.push('run')
			}
		}
		const isContainSun = weather.includes('太阳')
		if (isContainSun) {
			const { down, up } = getSunMoveTime(weatherInfo)
			if (weather.includes('太阳下山')) {
				rules.push(generateRule(down))
			}
			if (weather.includes('太阳升起')) {
				rules.push(generateRule(up))
			}
		}
	}
}
