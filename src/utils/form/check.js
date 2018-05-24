import Regular from '@/utils/tool/regular'
const eventType = 'blur'
export const checkAccount = [
	{
		validator: (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入账号'))
			}
			if (!Regular('mobile', value) && !Regular('email', value)) {
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
			if (!Regular('password', value)) {
				return callback(new Error('密码为 6-12 位格式'))
			}
			callback()
		},
		trigger: eventType
	}
]
export const checkName = (name = '昵称') => [
	{
		validator: (rule, value, callback) => {
			if (!value && name !== '备注') {
				return callback(new Error(`请输入${name}`))
			}
			if (!value && name === '备注') {
				return callback()
			}
			if (value.length > 10) {
				return callback(new Error(`${name}长度不能超过 10 位`))
			}
			if (value.length < 2) {
				return callback(new Error(`${name}长度不能少于 2 位`))
			}
			if (!Regular('name', value)) {
				return callback(new Error(`${name}只能包含字母，数字，下划线，减号`))
			}
			callback()
		},
		trigger: eventType
	}
]
export const checkAddress = [
	{
		validator: (rule, value, callback) => {
			if (value.length === 0) {
				return callback(new Error('请选择您所在的地区'))
			}
			callback()
		},
		trigger: eventType
	}
]
export const checkCaptcha = [
	{
		validator: (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入验证码'))
			}
			if (typeof value !== 'number') {
				return callback(new Error('验证码应为数字'))
			}
			if (value <= 0 || value > 20) {
				return callback(new Error('请输入验证码正确计算结果'))
			}
			callback()
		},
		trigger: eventType
	}
]
