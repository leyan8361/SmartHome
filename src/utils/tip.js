import { Message, MessageBox } from 'element-ui'
const Tip = function(
	type = 'error',
	message = '服务器发生错误，<strong>为减少您不必要的损失，请联系服务员</strong>',
	isBox = false,
	title = '错误',
	duration = 1000
) {
	if (!isBox) {
		Message({
			message: message,
			type: type,
			duration: duration,
			center: true,
			dangerouslyUseHTMLString: true,
			customClass: 'tip',
			showClose: true
		})
	} else {
		MessageBox.alert(message, title, {
			type: type,
			center: true,
			dangerouslyUseHTMLString: true,
			customClass: 'tip'
		})
	}
}

export default Tip
