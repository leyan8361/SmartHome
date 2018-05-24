export default {
	namespaced: true,
	state: {
		isHome:''
	},
	mutations: {
		home(state, isHome) {
			state.isHome = isHome
		}
	}
}
