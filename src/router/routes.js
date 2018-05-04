import Index from '@/views/Home/Index.vue'
import Error from '@/views/Error/404.vue'
import Home from '@/views/Admin/Index.vue'
export default [{
  path: '/',
  name: 'Index',
  component: Index
}, {
  path: '*',
  name: '404',
  component: Error
}, {
		path: '/home',
		name: 'Home',
		component: Home
}]
