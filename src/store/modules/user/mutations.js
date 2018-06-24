import Token from '@/utils/store/token'
export default {
	Token(state, token = Token.get()) {
		state.token = token
		const expires = 365
		Token.set(token, { expires }, state.keep)
	},
	Keep(state, keep) {
		state.keep = keep
	},
	Status(state, status) {
		state.status = status
		sessionStorage.setItem('status', status)
		if (status === 'UNLOGIN') {
			Token.remove()
		}
	},
	Info(state, { name, account, address, avatar, news,families }) {
		state.name = name
		state.account = account
		state.address = address
		state.avatar = avatar
		state.news = news
		state.families = families
	},
	News(state, type) {
		state.news[type] = 0
	},
	setAccount(state, account) {
		state.account = account
	},
	electricNewAdd(state) {
		if (!state.news.electric) {
			state.news.electric = 1
		} else {
			state.news.electric++
		}
	},
	setResult(state, { name, account, address, avatar }) {
		state.result.name = name
		state.result.account = account
		state.result.address = address
		state.result.avatar = avatar
	},
	addFamily(state, family) {
		const _family = {
			name: family.name,
			displayName: family.displayName || family.name
		}
		state.families.push(_family)
	}
}
