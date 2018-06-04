import { Notification } from 'element-ui'
const config = {
	dangerouslyUseHTMLString: true,
	customClass: 'custom-notice',
	showClose: true
}
export default ['info', 'success', 'warning', 'error'].reduce((notice, type) => {
	notice[type] = (msg, title = '错误',duration = 1200,position = 'top-right',offset = 0) => {
		return Promise.resolve(Notification({
			message: msg,
			title:title,
			type: type,
			position: position,
			offset:offset,
			duration: duration,
			...config
		}))
	}
	return notice
}, {})
