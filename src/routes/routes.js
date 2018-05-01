import Index from 'views/Home/Index.vue'
import Error from 'views/Error/404.vue'
export default [
	{
		path: '/',
		name: 'index',
		component: Index
	},
	{
		path: '*',
		name: '404',
		component: Error
	}
]
