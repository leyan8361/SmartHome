import Url from 'config/http'
import http from '@/utils/http'
export default {
	async setInfo({ commit }, bulbs) {
		commit('setBulbs',bulbs)
	},
	async updateBulb({ commit }, bulb) {
		return http.post(Url.auth.electric.bulb,bulb).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
