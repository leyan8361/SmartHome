export default (Vue) => {
	Vue.directive('focus', {
		inserted: function(el) {
			el.focus()
		}
	})
	Vue.directive('title', {
		inserted: function (el, binding) {
			document.title = binding.value
			/* <div v-title="'标题内容'"> */
		}
	})
}
