import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'
import auth from 'config/auth'
import Token from '@/utils/store/token'
import store from '@/store'
import tip from '@/utils/ui/tip'
import NProgress from 'nprogress'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: Routes
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
		// document.getElementById('card-title').textContent = to.meta.title
	}
	NProgress.start()
	if (!Token.get()) {
		if (auth.whiteList.includes(to.name)) {
			console.log('白名单路由')
			return next()
		}
		tip.info('请先登录！')
		setTimeout(() => store.commit('dialog/showLogin'), 1000)
		next({ path: '/' })
	} else {
		if (store.getters.status !== 'LOGIN') {
			store.commit('user/Status', 'LOGIN')
			tip.success('登录成功！')
		}
		if (to.name === 'Index') {
			return next({ path: '/home' })
		}
		if (!store.getters.account) {
			store.dispatch('user/getUserInfo').then(() => {
				store.dispatch('weather/getWeatherInfo').then(next).catch(next)
			})
		} else {
			if (!store.getters.cityID) {
				store.dispatch('weather/getWeatherInfo').then(next).catch(next)
			} else {
				next()
			}
		}
	}
})

router.afterEach((to, from) => {
	NProgress.done()
})

export default router
