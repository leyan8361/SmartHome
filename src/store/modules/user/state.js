import Token from '@/utils/store/token'
export default {
	name: '',
	account: '',
	address:'',
	avatar: '',
	news: {},
	token: Token.get(),
	keep: true,
	status: sessionStorage.getItem('status') || 'UNLOGIN'
}
