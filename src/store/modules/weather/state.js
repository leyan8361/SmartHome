import weather from 'config/weather'
export default {
	search: {},
	cityID: sessionStorage.getItem('cityID'),
	remote: 'province',
	enable: true,
	forecast: '',
	lifeStyle: '',
	now: '',
	sun: [],
	air: {}
}
