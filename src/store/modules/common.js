import http from '@/utils/http'
export default {
	namespaced: true,
	actions: {
		async getCaptcha({ state }) {
			return await http.get('/api/captcha')
		}
	}
}
