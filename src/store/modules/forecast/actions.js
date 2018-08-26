import http from '@/utils/http'
import Url from 'config/http'

export default {
	async getServiceDataWithSingleBulb({ commit }, bulb) {
		return http
			.get(Url.auth.forecast.bulb, {
				params: { bulb }
			})
			.then(response => {
				if (response.success) {
					commit('setSingleBulb', response.serviceData)
				}
				return response
			})
			.catch(error => {
				console.log(error)
				return { message: error }
			})
	},
	async getServiceDataWithAllBulb({ commit }) {
		return http
			.get(Url.auth.forecast.bulbs)
			.then(response => {
				if (response.success) {
					commit('setAllBulb', response.electricity)
				}
				return response
			})
			.catch(error => {
				console.log(error)
				return { message: error }
			})
	}
}
