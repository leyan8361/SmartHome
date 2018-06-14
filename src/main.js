import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index'
import 'element-ui/lib/theme-chalk/display'
import 'element-ui/lib/theme-chalk/base'
Vue.use(Element)

import 'normalize.css/normalize'
import '@/assets/css/globals'
import 'vue2-animate/dist/vue2-animate.min'

import 'nprogress/nprogress'
import NProgress from '@/plugins/NProgress'
Vue.use(NProgress)

import '@/assets/js/iconfont'
import IconSvg from '~/icons/Index'
Vue.component('icon-svg', IconSvg)

import console from './plugins/console'
// console()

import * as filters from './filters'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

import directives from './directives'
Vue.use(directives)

Vue.config.productionTip = false
new Vue({
	store,
	router,
	render: (h) => h(App)
}).$mount('#app')
