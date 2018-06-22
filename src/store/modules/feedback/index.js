import Url from 'config/http'
import http from '@/utils/http'

export default {
	namespaced: true,
	actions: {
		async addFeedback(context,feedback) {
			return http.put(Url.auth.feedback, feedback).then(response => {
				return response
			}).catch(error => {
				console.log(error)
				return {message:error}
			})
		}
	}
}
