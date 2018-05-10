export default {
	Result(state, { name, account, address, avatar }) {
		state.result.name = name
		state.result.account = account
		state.result.address = address
		state.result.avatar = avatar
	}
}
