import { Message } from 'element-ui'
const config = {
	center: true,
	dangerouslyUseHTMLString: true,
	customClass: 'custom-tip',
	showClose: true
}
const tip = {}
Array.prototype.forEach.call(['info', 'success', 'warning', 'error'],(type => {
	tip[type] = (msg, duration = 1500) => {
		return Promise.resolve(Message({
			message: msg,
			type: type,
			duration: duration,
			...config
		}))
	}
}))
export default tip
