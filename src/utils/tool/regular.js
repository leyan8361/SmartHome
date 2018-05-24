const Regular = (function() {
	const rules = {
		email(str) {
			return (/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/).test(str)
		},
		mobile(str) {
			return (/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/).test(str)
		},
		tel(str) {
			return (/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/).test(str)
		},
		number(str) {
			return (/^[0-9]$/).test(str)
		},
		english(str) {
			return (/^[a-zA-Z]+$/).test(str)
		},
		text(str) {
			return (/^\w+$/).test(str)
		},
		chinese(str) {
			return (/^[\u4E00-\u9FA5]+$/).test(str)
		},
		lower(str) {
			return (/^[a-z]+$/).test(str)
		},
		upper(str) {
			return (/^[A-Z]+$/).test(str)
		},
		password(str) {
			return (/^[a-zA-Z0-9.!@#$%^&*()_+/*<>?{}:"|~]{6,12}$/).test(str)
		},
		name(str) {
			return (/^[a-zA-Z0-9_-]{2,10}$/).test(str)
		},
		qq(str) {
			return (/^[1-9][0-9]{4,10}$/).test(str)
		},
		wechat(str) {
			return (/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/).test(str)
		}

	}
	//暴露接口
	return function(type,str) {
		//如果type是函数，就扩展rules，否则就是验证数据
		if (type.constructor === Function) {
			rules[str] = type
		} else {
			return rules[type] ? rules[type](str) : false
		}
	}
}())

export default Regular
