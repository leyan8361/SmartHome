import Token from '@/utils/token'
export default {
	name: '',
	account: '',
	address: '',
	token: Token.get(),
	keep: true,
	status: sessionStorage.getItem('status')||'UNLOGIN'
}
