import Url from 'config/http'
import http from '@/utils/http'
export default {
	async setInfo({ commit }, bulbs) {
		commit('setBulbs',bulbs)
	},
	async updateBulb({ commit,dispatch }, bulb) {
		return http.post(Url.auth.electric.bulb,bulb).then(response => {
			if (response.success) {
				commit('setTheBulb',bulb)
				commit('user/electricNewAdd', null,{root:true})
				// dispatch('usagelog/refresh', null,{root:true})
				commit('usagelog/setUsagelogs',response.usagelogs,{root:true})
			}
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async switchBulbs({ state,commit,dispatch }, bulb) {
		if (!bulb.ids.includes('0')) {
			bulb.name = []
			bulb.ids.forEach(id => {
				bulb.name.push(state.bulbs.find(e=>e.id === id).name)
			})
		}
		return http.post(Url.auth.electric.bulbs, bulb).then(response => {
			if (response.success) {
				commit('setAllBulbs', bulb)
				commit('user/electricNewAdd', null,{root:true})
				// dispatch('usagelog/refresh', null,{root:true})
				commit('usagelog/setUsagelogs',response.usagelogs,{root:true})
			}
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async switchBulbsStatus({ commit,dispatch },status) {
		return http.get(Url.auth.electric.bulbs, { params: { status } }).then(response => {
			if (response.success) {
				commit('setBulbsStatus', status)
				commit('user/electricNewAdd', null,{root:true})
				// dispatch('usagelog/refresh', null,{root:true})
				commit('usagelog/setUsagelogs',response.usagelogs,{root:true})
			}
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async addBulb({ commit }, bulb) {
		return http.put(Url.auth.electric.bulb,bulb).then(response => {
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
		return http.patch(Url.auth.electric.bulb,bulb).then(response => {
		response.success && commit('renameBulbById', bulb)
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
