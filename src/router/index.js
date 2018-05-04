import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'
import auth from 'config/auth'
import Token from '@/utils/token'
import store from '@/store'
Vue.use(Router)
const _i = new Vue()
const router = new Router({
  mode: 'history',
  routes: Routes
})

router.beforeEach((to, from, next) => {
	if (!Token.get()) {
    if (auth.whiteList.includes(to.name)) {
			return next()
		}
		_i.tip('info', '请先登录！')
		setTimeout(()=>store.commit('dialog/showLogin'),1000)
		return next({ path: '/' })
	} else {
		if (store.getters.status === 'UNLOGIN') {
			store.commit('user/SET_STATUS','LOGIN')
			_i.tip('success','登录成功！')
		}
		if (to.name === 'Index') {
      return next({ path: '/home' })
		}
		if (!store.getters.account) {
			store.dispatch('user/getUserInfo').then(next)
		} else {
			next()
		}
  }
})

router.afterEach((to, from) => {
	console.log(store.state.user)

})

export default router
