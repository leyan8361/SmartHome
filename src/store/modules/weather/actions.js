export default {
	async setInfo({ commit },{ weatherInfo, sunInfo, airInfo }) {
		commit('Weather',weatherInfo)
		commit('Sun',sunInfo)
		commit('Air',airInfo)
	}
}
