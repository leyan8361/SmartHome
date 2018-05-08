import Token from '@/utils/token'
export default  {
	SET_TOKEN: (state, token = Token.get()) => {
		state.token = token
		const expires = 365
		Token.set(token, { expires },state.keep)
	},
	SET_KEEP: (state, keep) => {
		state.keep = keep
	},
	SET_STATUS: (state, status) => {
		state.status = status
		sessionStorage.setItem('status', status)
		if (status === 'UNLOGIN') {
			Token.remove()
		}
	},
	SET_INFO: (state, { name, account, address,avatar }) =>{
		state.name = name
		state.account = account
		state.address = address
		state.avatar = avatar
	}
}
