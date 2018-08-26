import http from '@/utils/http'
import Url from 'config/http'
export default {
	namespaced: true,
	actions: {
		async sendAudio(context, audio) {
			return http
				.put(Url.auth.audio, audio)
				.then(response => {
					if (response.success) {

					}
					return response
				})
				.catch(error => {
					console.log(error)
					return { message: error }
				})
		}
	}
}
