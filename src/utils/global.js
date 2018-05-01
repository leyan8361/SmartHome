export default {
	baseUrl: 'http://tomotoes.com/',
	isPhone() {
		return (/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i).test( navigator.userAgent ) && window.innerWidth < 760
	}
}
