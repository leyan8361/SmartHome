import axios from 'axios'
import config from 'config/weather'
import store from '@/store'

export default () => {
  const { weather, sun, air } = config
  const http = axios.create({ params: { location: store.state.weather.cityID, key: config.key } })

	return axios.all([
    http.get(weather), http.get(sun), http.get(air)
	]).then(axios.spread(({ data: { HeWeather6: { '0': weatherInfo  } } }, { data: { HeWeather6: { '0': sunInfo  } } }, { data: { HeWeather6: { '0': airInfo  } } }) => {
    	return { weatherInfo, sunInfo, airInfo }
		}))
}
