export default {
	Enable(state, enable) {
		state.enable = enable
	},
	CityID(state, cityID) {
		if (cityID) {
			sessionStorage.setItem('cityID',cityID)
		} else {
			sessionStorage.removeItem('cityID')
		}
		console.log('设置city' + cityID)
		state.cityID = cityID
	},
	Remote(state, remote) {
		state.remote = remote
	},
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
	},
	Search(state, search) {
		state.search = search
	}
}
