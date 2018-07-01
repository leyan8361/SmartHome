// const { generateRule } = require('utils/task')
const { getWeather, isSunnyorCloudy, getSunMoveTime } = require('utils/http')

module.exports = {
	ResolveExec(time) {
		if (time && Object.values(time).length) {
			return `${time.second} ${time.minute || time.minutes} ${time.hour} * * *`
		}
	},
	async ResolveWeather(weather,address) {
		const rules = []

		const weatherInfo = await getWeather(address)
		const isContainSunny = Array.isArray(weather) && weather.includes('晴天')
		const isContainCloudy = Array.isArray(weather) && weather.includes('阴天')
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
				rules.push(`${down.second} ${down.minute || down.minutes} ${down.hour} * * *`)
			}
			if (weather.includes('太阳升起')) {
				rules.push(`${up.second} ${up.minute || up.minutes} ${up.hour} * * *`)
			}
		}
		return rules
	}
}
