import Url from 'config/http'
import http from '@/utils/http'
export default {
	async setInfo({ commit }, bulbs) {
		commit('setBulbs',bulbs)
	},
	async updateBulb({ commit }, bulb) {
		commit('setTheBulb',bulb)
		return http.post(Url.auth.electric.bulb,bulb).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async switchBulbs({ commit },bulb) {
		commit('setAllBulbs', bulb)

		return http.post(Url.auth.electric.bulbs, bulb).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async switchBulbsStatus({ commit },status) {
		commit('setBulbsStatus', status)
		return http.get(Url.auth.electric.bulbs, { params: { status } }).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async addBulb({ commit }, bulb) {
		commit('addBulb', bulb)
		return http.patch(Url.auth.electric.bulb,bulb).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async deleteBulb({ commit }, id) {
		commit('deleteBulbById', id)
		return http.delete(Url.auth.electric.bulb, { params: { id } }).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async renameBulb({ commit }, bulb) {
		commit('renameBulbById', bulb)
		return http.put(Url.auth.electric.bulb,bulb).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
