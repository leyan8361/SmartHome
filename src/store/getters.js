export default {
	token: state => state.user.token,
	name: state=> state.user.name,
	account: state=> state.user.account,
	password: state=> state.user.password,
	address: state => state.user.address,
	status: state => state.user.status
}
