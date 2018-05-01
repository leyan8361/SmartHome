import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import './registerServiceWorker'

import http from './utils/http'
import console from './plugins/console'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/base.css'
import 'normalize.css/normalize.css'
import 'css/globals.styl'
import * as filters from './filters'
import directives from './directives'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

console()
Vue.use(directives)
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(Element)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
