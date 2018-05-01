import Regular from './regular'
const eventType = 'blur'
export const checkAccount = [
	{
		validator: (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入账号'))
			}
			if (!Regular.phone(value) && !Regular.email(value)) {
				return callback(new Error('账号为手机或邮箱格式'))
			}
			callback()
		},
		trigger: eventType
	}
]
export const checkPassword = [
	{
		validator: (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入密码'))
			}
			if (!Regular.password(value)) {
				return callback(new Error('密码为 6-12 位格式'))
			}
			callback()
		},
		trigger: eventType
	}
]
export const checkName = [
	{
		validator: (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入昵称'))
			}
			if (value.length > 8) {
				return callback(new Error('昵称长度不能超过 8 位'))
			}
			if (value.length < 2) {
				return callback(new Error('昵称长度不能少于 2 位'))
			}
			callback()
		},
		trigger: eventType
	}
]
export const checkAddress = [
	{
		validator: (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请选择您所在的地区'))
			}
			if (!value[0] || !value[1] || !value[2]) {
				return callback(new Error('地址不能为空'))
			}
			callback()
		},
		trigger: eventType
	}
]
