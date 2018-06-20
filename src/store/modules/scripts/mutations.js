export default {
	setScripts(state, scripts) {
		state.scripts = scripts
	},
	deleteScript(state, index) {
		state.scripts.splice(index,1)
	},
	disableScript(state, index) {
		state.scripts[index].disable = true
	},
	addScript(state, script) {
		state.scripts.push(script)
	}
}
