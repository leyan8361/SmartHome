export default {
  filterResult(state, status) {
    if (status === 'unknown location' || status === 'no data for this location') {
			console.log('偏远地区')
			if (state.remote === 'county') {
        state.remote = 'city'
			} else if (state.remote === 'city') {
				state.remote = 'province'
			} else if (state.remote === 'province') {
				state.enable = false
			}
		} else if (status !== 'ok') {
			console.log(status)
			state.enable = false
		}
	},
	SET_ENABLE(state, enable) {
		state.enable = enable
	},
	SET_CITYID(state, cityID) {
		sessionStorage.setItem('cityID',cityID)
		state.cityID = cityID
	},
	SET_REMOTE(state, remote) {
		state.remote = remote
	},
	SET_SUN(state, sun) {
		state.sun = sun.sunrise_sunset
	},
	SET_AIR(state, air) {
		state.air = air.air_now_city
	},
	SET_WEATHER(state, weather) {
		state.forecast = weather.daily_forecast
		state.now = weather.now
		state.lifeStyle = weather.lifestyle
	}
}
