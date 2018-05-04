import http from '@/utils/http'
import Url from 'config/http'
export default {
	namespaced: true,
	actions: {
		async getCaptcha({ state }) {
			return await http.get(Url.api.captcha)
		}
	}
}
