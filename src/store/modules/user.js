import Token from '@/utils/token'
import http from '@/utils/http'
export default {
	namespaced: true,
	state: {
		name: '',
		account: '',
		avatar: '',
		address: '',
		token: Token.get(),
		keep: true
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
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
		async Login({ commit, state }, userInfo) {
			await http.post('/api/login', userInfo)
				.then(response => {
					const data = response.data
					commit('SET_TOKEN', data.token)
					const expires = state.keep ? 365 : null
					Token.set(response.data.token, { expires })
					/* 异常处理 弹出错误消息 */
				})
				.catch(error => {})
		},

		// 获取用户信息
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				http
					.get('/auth/userinfo', { params: state.token })
					.then(response => {
						const data = response.data
						commit('SET_NAME', data.name)
						commit('SET_AVATAR', data.avatar)
						commit('SET_INTRODUCTION', data.introduction)
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
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
