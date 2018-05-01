export default  {
	phone(phone){
		if (!(/^1[34578]\d{9}$/.test(phone))){
				return false
		}
		return true
	},
	email(email){
		if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email))){
				return false
		}
		return true
	},
	password(password) {
		if (!(/^[a-zA-Z0-9.!@#$%^&*()_+/*<>?{}:"|~]{6,12}$/.test(password))) {
			return false
		}
		return true
	}
}
