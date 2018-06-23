import notice from 'config/notice'
export default {
	async setInfo({ commit }, notices) {
		if (!notices) {
			return console.warn('暂无消息通知')
		}
		const { family, weather, electric } = notices
		family && commit(notice.type[0], family)
		weather && commit(notice.type[1], weather)
		electric && commit(notice.type[2], electric)
	}
}
