import http from '@/utils/http'
import weather from 'config/weather'
import weatherInfo from '@/utils/weather'
export default {
	async addRemote({ state }, address) {

		return await http.get(weather.cityID, {
			params: {
				location: address,
				key: weather.key,
				group: weather.group
			},
			withCredentials: false,
		}).then(({ HeWeather6: { "0": { basic: { "0": { cid: cityID } }, status } } }) => {
			return {status,cityID}
		})
	},
	async getCityID({ dispatch,state,rootGetters,commit}, address) {
		await dispatch('addRemote', address).then(({ status , cityID }) => {
			commit('filterResult', status)
			if (!state.enable) {
				console.log('天气服务发生错误！')
			}
			else if (status === 'ok') {
				commit('SET_CITYID',cityID)
			}
			else {
				dispatch('getCityID', rootGetters.address[state.remote])
			}
		}).catch(err => {
			console.error(err)
			commit('SET_ENABLE',false)
		})
	},
	async getWeatherInfo({ state,commit, dispatch,rootGetters }) {
		if (!state.cityID) {
			const address = rootGetters.address
			if (address.county) {
				commit('SET_REMOTE','county')
			} else if (address.city) {
				commit('SET_REMOTE','city')
			}
			await dispatch('getCityID', address[state.remote])
			if (!state.enable) {
				return
			}
		}

		weatherInfo().then(({ weatherInfo, sunInfo, airInfo }) => {
			commit('SET_WEATHER',weatherInfo)
			commit('SET_SUN',sunInfo)
			commit('SET_AIR',airInfo)
		}).catch(err => {
			console.error(err)
			commit('SET_ENABLE',false)
		})
	}

}
