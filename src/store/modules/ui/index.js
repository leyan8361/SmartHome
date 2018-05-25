export default {
	namespaced: true,
	state: {
		isHome: '',
		familyTab:'receive'
	},
	mutations: {
		home(state, isHome) {
			state.isHome = isHome
		},
		setFamilyTab(state, tab) {
			state.familyTab = tab
		}
	}
}
