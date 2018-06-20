export default {
	namespaced: true,
	state: {
		isHome: '',
		familyTab: 'receive',
		scriptFormFinishCount:0
	},
	mutations: {
		home(state, isHome) {
			state.isHome = isHome
		},
		setFamilyTab(state, tab) {
			state.familyTab = tab
		},
		finishScriptForm(state, { isFinish,id }) {
			const n = isFinish ? 0 : -1
			if (n === -1 && state.scriptFormFinishCount === 0) {
				return
			}
			if (n === 0 && state.scriptFormFinishCount === 3) {
				return
			}
			if (state.scriptFormFinishCount >= id && n === 0) {
				return
			}
			if (state.scriptFormFinishCount > id && n === -1) {

			}
			state.scriptFormFinishCount = id + n
		}
	}
}
