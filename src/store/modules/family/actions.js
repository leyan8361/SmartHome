import http from '@/utils/http'
import Url from 'config/http'

export default {
	async search({ commit, state }, account) {
		return http.get(Url.auth.family.userInfo,
			{ params: { account } }).then(response => {
			response.success &&	commit('Result',response)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async invite({ commit, state }, verification) {
		return http.post(Url.auth.family.member, verification).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
