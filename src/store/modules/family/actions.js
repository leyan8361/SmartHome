import http from '@/utils/http'
import Url from 'config/http'

export default {
	async join({ commit },verification) {
    return http.put(Url.auth.family.member,verification).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async create({ commit }, family) {
		return http.put(Url.auth.family.family,family).then(response => {
			response.success && commit('user/addFamily',family,{root:true})
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async search({ commit }, name) {
		return http.get(Url.auth.family.family,{params:{name}}).then(response => {
			response.success && commit('setResult',response.family)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
  async invite({ commit }, verification) {
		return http.post(Url.auth.family.family, verification).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async hasExisted({ commit }, name) {
		return http.get(Url.auth.family.name,{params:{name}}).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async member({ commit }, families) {
		return http.get(Url.auth.family.member,{params:{families}}).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
