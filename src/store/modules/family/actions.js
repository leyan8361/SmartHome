import http from '@/utils/http'
import Url from 'config/http'

export default {
	async search({ commit }, account) {
		return http.get(Url.auth.family.userInfo,
			{ params: { account } }).then(response => {
			response.success &&	commit('Result',response)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async invite({ commit }, verification) {
		return http.put(Url.auth.family.invite, verification).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async join({ commit }) {

	},
	async refuse({ commit }, receipts) {
		return http.post(Url.auth.family.invite,receipts).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
