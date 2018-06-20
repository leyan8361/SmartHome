import store from '@/store'
import tip from '@/utils/ui/tip'
import router from '@/router'
export default {
	logOut({ hasTip = true, isShowLogin = true, msg = '您的登录信息已失效，请重新登录！' }) {
		store.commit('user/Status', 'UNLOGIN')
		store.commit('dialog/changeShowStatus',{name:'Login',status:false})
		store.commit('ui/finishFormCountToZero')
		router.push({ name: 'Index', path: '/' })
		hasTip &&	tip.info(msg)
		isShowLogin && setTimeout(() => store.commit('dialog/showLogin'), 1000)
	}
}
