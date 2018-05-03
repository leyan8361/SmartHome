import Token from '@/utils/token'
import http from '@/utils/http'

export default {
	namespaced: true,
	state: {
		name: '',
		account: '',
		address: '',
		token: Token.get(),
		status: '',
		keep: true
	},
	mutations: {
		SET_STATUS: (state, status) => {
			state.status = status
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			const expires = state.keep ? 365 : null
			Token.set(response.token, { expires })
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_ACCOUNT: (state, account) => {
			state.account = account
		},
		SET_ADDRESS: (state, address) => {
			state.address = address
		},
		SET_KEEP: (state, keep) => {
			state.keep = keep
		}
	},
	actions: {
		// 用户名登录
		async login({ commit, state }, user) {
			await http
				.post('/api/login', user)
				.then(response => {
					if (response.success) {
						commit('SET_TOKEN', response.token)
						const {name,account,address} = response.userInfo
						commit('SET_NAME', name)
						commit('SET_ACCOUNT', account)
						commit('SET_ADDRESS', address)
					}
					return response
				})
				.catch(error => {
					console.log(error)
				})
		},
		async registry({ commit }, user) {
			return await http
				.post('/api/registry', user)
				.then(response => {
					return response
				})
				.catch(error => {
					console.log(error)
				})
		},
		async hasExisted({ state }, account) {
			return await http
				.get('/api/exist', {
					params: { account }
				})
				.then(response => {
					if (response.success) {
						return response.hasExisted
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		// 获取用户信息
		GetUserInfo({ commit, state }) {
			// return new Promise((resolve, reject) => {
			// 	http
			// 		.get('/auth/userinfo', { params: state.token })
			// 		.then(response => {
			// 			const data = response.data
			// 			commit('SET_NAME', data.name)
			// 			commit('SET_AVATAR', data.avatar)
			// 			commit('SET_INTRODUCTION', data.introduction)
			// 			resolve(response)
			// 		})
			// 		.catch(error => {
			// 			reject(error)
			// 		})
			// })
		}
		// // 登出
		// LogOut({ commit, state }) {
		// 	return new Promise((resolve, reject) => {
		// 		logout(state.token)
		// 			.then(() => {
		// 				commit('SET_TOKEN', '')
		// 				Token.remove()
		// 				resolve()
		// 			})
		// 			.catch(error => {
		// 				reject(error)
		// 			})
		// 	})
		// },

		// // 前端 登出
		// FedLogOut({ commit }) {
		// 	return new Promise(resolve => {
		// 		commit('SET_TOKEN', '')
		// 		Token.remove()
		// 		resolve()
		// 	})
		// }
	}
}
