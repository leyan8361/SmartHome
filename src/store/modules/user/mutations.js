import Token from '@/utils/store/token'
export default {
	Token(state, token = Token.get()) {
		state.token = token
		const expires = 365
		Token.set(token, { expires },state.keep)
	},
	Keep(state, keep) {
		state.keep = keep
	},
	Status(state, status){
		state.status = status
		sessionStorage.setItem('status', status)
		if (status === 'UNLOGIN') {
			Token.remove()
		}
	},
	Info(state, { name, account, address,avatar,news}){
		state.name = name
		state.account = account
		'code' in address && delete address.code
		state.address = address
		state.avatar = avatar
		state.news = news
	},
	News(state, news){
		state.news = news
	},
	setAccount(state, account) {
		state.account = account
	}
}
