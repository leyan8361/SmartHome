import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import dialog from './modules/dialog'
import common from './modules/common'
import user from './modules/user'
import weather from './modules/weather'
import family from './modules/family'
import notice from './modules/notice'
import electrics from './modules/electrics'
import scripts from './modules/scripts'
import ui from './modules/ui'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		dialog,
		common,
		user,
		weather,
		family,
		notice,
		electrics,
		scripts,
		ui
	},
	getters,
	strict
	// plugins: strict ? [createLogger()] : []
})
