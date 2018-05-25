import http from '@/utils/http'
import Url from 'config/http'
import Token from '@/utils/store/token'
import notice from 'config/notice'
export default {
	async login({ commit, state,dispatch }, user) {
		return http
			.post(Url.api.login, user)
			.then(response => {
				if (response.success) {
					console.log(response.userInfo)
					commit('Info', response.userInfo)
					commit('Token', response.token)
					dispatch('weather/setInfo',response.weather, {root:true})
					response.notice && dispatch('notice/setInfo',response.notice, {root:true})
				}
				return response
			})
			.catch(error => {
				console.error(error)
				return {message:error}
			})
	},
	async registry({ commit }, user) {
		return http
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
		return http
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
	async getUserInfo({ state, commit,dispatch }) {
		return http.get(Url.auth.userInfo).then(response => {
			if (response.success) {
				console.log(response.userInfo)
				commit('Info', response.userInfo)
				dispatch('weather/setInfo',response.weather, {root:true})
				response.notice && dispatch('notice/setInfo',response.notice, {root:true})

			}
			return response
		}).catch(error => {
				console.log(error)
				return {message:error}
		})
	},
	async modify({ state, commit }, user) {
		return http.post(Url.auth.userInfo,user).then(response => {
			if (response.success) {
				response.token && commit('Token', response.token)
			}
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async newsToZero({ commit },type) {
		return http.delete(Url.auth.news[type]).then(response => {
			response.success && commit('News',0)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
