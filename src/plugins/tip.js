import { Message } from 'element-ui'
export default {
	install(Vue, options) {
		Vue.prototype.tip = (type = 'warning', msg, duration = 1500) => {
			return Promise.resolve(Message({
				message: msg,
				type: type,
				duration: duration,
				center: true,
				dangerouslyUseHTMLString: true,
				customClass: 'custom-tip',
				showClose: true
			}))
		}
	}
}
