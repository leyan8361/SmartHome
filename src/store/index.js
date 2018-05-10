import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import dialog from './modules/dialog'
import common from './modules/common'
import user from './modules/user'
import weather from './modules/weather'
import family from './modules/family'
import notice from './modules/notice'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		dialog,
		common,
		user,
		weather,
		family,
		notice
	},
	getters
})
