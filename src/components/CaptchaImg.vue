<template lang="pug">
.captcha-wrap
	span(v-html="captcha" @click="handleCaptcha()")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
	methods: {
		...mapActions('common', ['getCaptcha'])
	}
})
export default class CaptchaImg extends Vue {
	captcha = ''
	handleCaptcha() {
		this.getCaptcha().then(res => {
			if (res.success) {
				this.captcha = res.captcha
			}
		})
	}
	mounted() {
		this.handleCaptcha()
	}
}
</script>
<style lang="stylus">
.captcha-wrap
	display inline-block
</style>
