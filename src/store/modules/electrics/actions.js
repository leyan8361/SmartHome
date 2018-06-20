import Url from 'config/http'
import http from '@/utils/http'
export default {
	async setInfo({ commit }, bulbs) {
		commit('setBulbs',bulbs)
	},
	async updateBulb({ commit }, bulb) {
		return http.post(Url.auth.electric.bulb,bulb).then(response => {
			response.success && commit('setTheBulb',bulb)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async switchBulbs({ commit },bulb) {
		return http.post(Url.auth.electric.bulbs, bulb).then(response => {
			response.success && commit('setAllBulbs', bulb)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async switchBulbsStatus({ commit },status) {
		return http.get(Url.auth.electric.bulbs, { params: { status } }).then(response => {
			response.success && commit('setBulbsStatus', status)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async addBulb({ commit }, bulb) {
		return http.patch(Url.auth.electric.bulb,bulb).then(response => {
			response.success && commit('addBulb', bulb)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async deleteBulb({ commit }, id) {
		return http.delete(Url.auth.electric.bulb, { params: { id } }).then(response => {
			response.success && commit('deleteBulbById', id)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async renameBulb({ commit }, bulb) {
		return http.put(Url.auth.electric.bulb,bulb).then(response => {
		response.success && commit('renameBulbById', bulb)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
