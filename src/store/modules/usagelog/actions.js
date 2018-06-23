import Url from 'config/http'
import http from '@/utils/http'

export default {
	async setInfo({ commit }, usagelogs) {
		commit('setUsagelogs', usagelogs)
	},
	async refresh({ commit }) {
		const usagelogs = await http.get(Url.auth.usagelog)
		commit('setUsagelogs', usagelogs)
	}
}
