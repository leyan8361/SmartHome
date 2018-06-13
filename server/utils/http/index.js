const axios = require('axios')
const config = require('config/weather')

module.exports = {
	async getWeather(cityID) {
		const { weather, sun, air } = config

		const http = axios.create({ params: { location: `CN${cityID}`, key: config.key } })

		// return axios.all([http.get(weather), http.get(sun), http.get(air)])
		// 	.then(axios.spread(({ data: { HeWeather6: { '0': weatherInfo } } }, { data: { HeWeather6: { '0': sunInfo } } }, { data: { HeWeather6: { '0': airInfo } }
		// }) => {
		// 	return { weatherInfo, sunInfo, airInfo }
		// })).catch(e=>{
		// 	console.log(e)
		// })

		return http.get(weather)
			.then(({ data: { HeWeather6: { '0': weatherInfo } } })=>weatherInfo)
			.catch(e=>{ console.error(e) })

	}
}
