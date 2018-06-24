import http from '@/utils/http'
import Url from 'config/http'

export default {
	async join({ commit }) {

	},
	async create({ commit }, family) {
		return http.put(Url.auth.family.family,family).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async hasExisted({ commit }, name) {
		return http.get(Url.auth.family.family,{params:{name}}).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
  async invite({ commit }, verification) {
		return http.put(Url.auth.family.family, verification).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
