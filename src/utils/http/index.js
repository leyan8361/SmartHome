import config from 'config/http'
import axios from 'axios'
import router from '@/router'
import tip from '@/utils/ui/tip'
import Token from '@/utils/store/token'
import status from '@/utils/global/status'
import NProgress from 'nprogress'

const instance = axios.create({
	baseURL: config.baseUrl,
	timeout: 100000,
	withCredentials: true,
	headers: {
		'Content-Type':'application/json;charset=UTF-8'
	}
})

instance.interceptors.request.use(
	config => {
		NProgress.start()
		if (config.url.indexOf('auth')!==-1) {
			const token = Token.get()
			if (token) { config.headers.common['Authorization'] = 'Bearer ' + token }
			else {
				status.logOut({hasTip:true,isShowLogin:true})
			}
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(
	response => { NProgress.done(); return response.data },
	error => {
		NProgress.done()
		if (error.response) {
			switch (error.response.status) {
				case 401:
					status.logOut({hasTip:true,isShowLogin:true})
					break
				default:
					tip.error(`服务器错误！错误代码：${error.response.status}`)
			}
			return Promise.reject(error.response.data)
		}
		console.log(error)
	}
)

export default instance
