const config = require('config')
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import Token from '@/utils/token'

const instance = axios.create({
	baseURL: config.baseUrl,
	timeout: 5000,
	withCredentials: true
})

instance.interceptors.request.use(
	config => {
		const token = Token.get()
		if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
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
					router.push('error/401')
				case 403:
					router.push('error/403')
				default:
					Message({ message: `服务器错误！错误代码：${error.response.status}`, type: 'error' })
			}
			return Promise.reject(error.response.data)
		}
		console.log(error)
	}
)

export default instance
