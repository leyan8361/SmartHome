import filterWeatherInfo from '@/utils/weather'

export default {
	Weather(state, weather) {
		const { sr: up, ss: down } = weather.daily_forecast[0]
		weather.forecast = weather.daily_forecast
		;['now', 'forecast', 'lifestyle'].forEach(e => {
			state[e] = filterWeatherInfo[e](weather[e])
		})
		state.now.sun = { up, down }
	}
}
