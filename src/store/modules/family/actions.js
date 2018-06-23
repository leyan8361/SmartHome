import http from '@/utils/http'
import Url from 'config/http'

export default {
	async join({ commit }) {

	},
	async create({ commit }, family) {

	},
	async hasExisted({ commit }, name) {

	},
  async invite({ commit }, verification) {
		return http.put(Url.auth.family.invite, verification).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
