import notice from 'config/notice'
export default {
	async setInfo({ commit }, { family, weather, electric }) {
		commit(notice.type[0], family)
		commit(notice.type[1], weather)
		commit(notice.type[2], electric)
	}
}
