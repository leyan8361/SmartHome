import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'
import store from '@/store'
import Token from '@/utils/token'

Vue.use(Router)

const whiteList = ['/', '/about', '/404', '/img', '/api']
const router = new Router({
	mode: 'history',
	routes: Routes
})

const token = Token.get()
store.commit('user/SET_TOKEN', token)

router.beforeEach((to, from, next) => {
	if (whiteList.indexOf(to.path) === -1) {
		if (!store.state.token) {
			next({ path: '/' })
		} else {
			if (to.path === '/') {
				next({ path: '/home' })
			} else {
				next()
			}
		}
	} else {
		next()
	}
})

export default router
