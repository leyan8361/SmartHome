import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Textra from 'vue-textra'
Vue.use(Textra)

import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

import VeHistogram from 'v-charts/lib/histogram.common'
Vue.component(VeHistogram.name, VeHistogram)

import VePie from 'v-charts/lib/pie.common'
Vue.component(VePie.name, VePie)

// import VeTree from 'v-charts/lib/tree.common'
// Vue.component(VeTree.name, VeTree)

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index'
import 'element-ui/lib/theme-chalk/display'
import 'element-ui/lib/theme-chalk/base'
Vue.use(Element)

import 'normalize.css/normalize'
import '@/assets/css/globals'
import '@/assets/css/element'
import 'vue2-animate/dist/vue2-animate.min'

import 'nprogress/nprogress.css'
import NProgress from '@/plugins/NProgress'
Vue.use(NProgress)

import '@/assets/js/iconfont'
import IconSvg from '~/icons/IconSvg'
Vue.component('icon-svg', IconSvg)

import console from './plugins/console'
console()

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
	render: h => h(App)
}).$mount('#app')
