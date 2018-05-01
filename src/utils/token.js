import Cookies from 'js-cookie'

const TokenKey = 'Light-Token'
export default {
	get() {
		return Cookies.get(TokenKey)
	},
	set(token, options = null) {
		return Cookies.set(TokenKey, token, options)
	},
	remove() {
		return Cookies.remove(TokenKey)
	}
}
