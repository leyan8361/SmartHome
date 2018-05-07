import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/base.css'
import 'normalize.css/normalize.css'
import '@/assets/css/globals.styl'
Vue.use(Element)

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
	render: (h) => h(App),
}).$mount('#app')
