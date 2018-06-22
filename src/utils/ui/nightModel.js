export default () => {
	if (sessionStorage.getItem('night') === null) {
		if (new Date().getHours() > 22 || new Date().getHours() < 6) {
			sessionStorage.setItem('night', '1')
			return true
		}
		sessionStorage.setItem('night', '0')
		return false
	}
	let night = sessionStorage.getItem('night') || '0'
	return night !== '0'

}
