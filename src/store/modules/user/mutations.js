import Token from '@/utils/token'
export default  {
	SET_TOKEN: (state, token = Token.get()) => {
		state.token = token
		const expires = 365
		Token.set(token, { expires },state.keep)
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_ACCOUNT: (state, account) => {
		state.account = account
	},
	SET_ADDRESS: (state, address) => {
		state.address = address
	},
	SET_KEEP: (state, keep) => {
		state.keep = keep
	},
	SET_STATUS: (state, status) => {
		state.status = status
		sessionStorage.setItem('status',status)
	},
	SET_INFO: (state, { name, account, address }) =>{
		state.name = name
		state.account = account
		state.address = address
	}
}
