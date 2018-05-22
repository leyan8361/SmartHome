export default {
	Sun(state, sun) {
		state.sun = sun.sunrise_sunset
	},
	Air(state, air) {
		state.air = air.air_now_city
	},
	Weather(state, weather) {
		state.forecast = weather.daily_forecast
		state.now = weather.now
		state.lifeStyle = weather.lifestyle
	}
}
