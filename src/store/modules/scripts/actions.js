import Url from 'config/http'
import http from '@/utils/http'
export default {
	async setInfo({ commit }, scripts) {
		commit('setScripts',scripts)
	},
	async deleteScriptByIndex({ commit,state }, index) {
		const id = state.scripts[index].scriptID
		commit('deleteScript', index)
		return http.delete(Url.auth.script,{params:{id}}).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async disableScriptByIndex({ commit,state }, index) {
		const id = state.scripts[index].scriptID
		commit('disableScript', index)
		return http.put(Url.auth.script,id).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	},
	async addScript({ commit, state }, script) {
		commit('addScript', script)
		return http.post(Url.auth.script,script).then(response => {
			return response
		}).catch(error => {
			console.log(error)
			return {message:error}
		})
	}
}
