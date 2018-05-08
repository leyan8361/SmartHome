import http from '@/utils/http'
import Url from 'config/http'
import Token from '@/utils/token'
export default {
	async login({ commit, state }, user) {
		return await http
			.post(Url.api.login, user)
			.then(response => {
				if (response.success) {
					commit('SET_TOKEN', response.token)
					commit('SET_INFO',response.userInfo)
				}
				return response
			})
			.catch(error => {
				console.error(error)
				return {message:error}
			})
	},
	async registry({ commit }, user) {
		return await http
			.post(Url.api.registry, user)
			.then(response => {
				return response
			})
			.catch(error => {
				console.log(error)
				return {message:error}
			})
	},
	async hasExisted({ state }, account) {
		return await http
			.get(Url.api.exist, {
				params: { account }
			})
			.then(response => {
				if (response.success) {
					return response.hasExisted
				}
			})
			.catch(error => {
				console.log(error)
				return {message:error}
			})
	},
	async getUserInfo({ state, commit }) {
		return await http.get(Url.auth.userInfo, {
			params: {token:state.token}
		}).then(response => {
			if (response.success) {
				commit('SET_INFO',response.userInfo)
			}
			return response
			}).catch(error => {
				console.log(error)
				return {message:error}
		})
	}
}
