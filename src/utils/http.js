import config from 'config/http'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import Token from '@/utils/token'

const instance = axios.create({
	baseURL: config.baseUrl,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type':'application/json;charset=UTF-8'
	}
})

instance.interceptors.request.use(
	config => {
		const token = Token.get()
		if (token && config.withCredentials) {
			config.headers.common['Authorization'] = 'Bearer ' + token
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(
	response => response.data,
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 401:
					Token.remove()
					Message({ type: 'error', message: '您的登录信息已失效，请重新登录！' })
					router.push('/')
					break
				default:
					Message({ message: `服务器错误！错误代码：${error.response.status}`, type: 'error' })
			}
			return Promise.reject(error.response.data)
		}
		console.log(error)
	}
)

export default instance
