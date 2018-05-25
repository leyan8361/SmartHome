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

router.beforeEach((to,from, next) => {
	NProgress.start()

	if (to.meta.title) {
		document.title = to.meta.title
	}
	if (!Token.get()) {
		if (auth.whiteList.includes(to.name)) {
			console.log('白名单路由')
			return next()
		}
		tip.info('请先登录！')
		setTimeout(() => store.commit('dialog/showLogin'), 1000)
		next({ path: '/',name:'Index' })
	} else {
		if (store.getters.status !== 'LOGIN') {
			store.commit('user/Status', 'LOGIN')
			tip.success('登录成功！')
		}
		if (to.name === 'Index') {
			return next({ path: '/home',name:'Home' })
		}
		if (!store.getters.account) {
			store.dispatch('user/getUserInfo').then(next).catch(()=>next({ path: '/',name:'Index' }))
		} else {
			next()
		}
	}
})

router.afterEach((to, from) => {
	store.commit('ui/home',to.name === 'Home')
	NProgress.done()
})

router.onError((to, from) => {
	NProgress.done()
	tip.error('发生一点小问题~')
	router.push({ path: '/',name:'Index' })
})

export default router
