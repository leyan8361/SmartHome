<template lang="pug">
el-dialog(title="注册" :visible="isShowRegistry" width="25%" top="8vh" lock-scroll model  center custom-class="dialog" :before-close="handleClose")
	el-form.form(type="flex" justify="center" align="middle" :model="user" :rules="rules" ref="form" label-width="100px"  center status-ico)
		el-form-item(label="昵称" prop="name")
			el-input(type="text" v-model.trim="user.name" placeholder="2-8 位字符" clearable)
		el-form-item(label="账号" prop="account")
			el-input(type="text" v-model.trim="user.account" placeholder="账号 / 邮箱" clearable @change="existHandle")
		el-form-item(label="密码" prop="password")
			el-input(type="password" v-model.trim="user.password" placeholder="6-12位 数字/字母/英文符号" clearable)
		el-form-item(label="确定密码" prop="checkpass")
			el-input(type="password" v-model.trim="user.checkpass" placeholder="6-12位 数字/字母/英文符号" clearable)
		el-form-item(label="所在地区")
			city-select(:address.sync="user.address" :is-init="isInit")
		el-form-item(label="验证码" prop="captcha")
			el-tooltip(effect="light" content="输入验证码的计算结果" placement="bottom" :disabled='disable')
				el-input.captcha(type="text" v-model.trim.number="user.captcha" @change='disable=true')
			captcha-img
	.dialog-footer(slot="footer")
		el-row
			el-button.registry(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在注册") 注册
			el-button(@click="isInit=true,$refs.form.resetFields()") 重置
		el-row
			el-button(type="text" @click="replaceRegistry") 登录已有账号
</template>

<script>
import { Vue, Component, Watch } from 'vue-property-decorator'
import CitySelect from '@/components/CitySelect.vue'
import CaptchaImg from '@/components/CaptchaImg.vue'
import config from 'config'
import { mapState, mapMutations, mapActions } from 'vuex'
import {
	checkAccount,
	checkPassword,
	checkName,
	checkCaptcha
} from '@/utils/check'
import Regular from '@/utils/regular'
import Tip from '@/utils/tip'
@Component({
	components: {
		CitySelect,
		CaptchaImg
	},
	computed: {
		...mapState('dialog', ['isShowRegistry'])
	},
	methods: {
		...mapMutations('dialog', ['changeShowStatus', 'replaceRegistry']),
		...mapActions('user', ['registry', 'hasExisted'])
	}
})
export default class RegistryDialog extends Vue {
	user = {
		name: '',
		account: '',
		password: '',
		checkpass: '',
		address: {
			province: '',
			city: '',
			county: ''
		},
		captcha: ''
	}
	selections = []
	disable = false
	isHad = false
	isLoading = false
	isInit = false
	rules = {
		name: checkName,
		account: checkAccount,
		captcha: checkCaptcha,
		password: [
			{
				validator: (rule, value, callback) => {
					if (!value) {
						return callback(new Error('请输入密码'))
					}
					if (!Regular('password', value)) {
						return callback(new Error('密码为 6-12 位格式'))
					}
					if (this.user.checkpass) {
						this.$refs.form.validateField('checkpass')
					}
					callback()
				},
				trigger: 'blur'
			}
		],
		checkpass: [
			{
				validator: (rule, value, callback) => {
					if (!value) {
						return callback(new Error('请再次输入密码'))
					}
					if (!Regular('password', value)) {
						return callback(new Error('密码为 6-12 位格式'))
					}
					if (value !== this.user.password && this.user.password) {
						return callback(new Error('您两次输入的密码不一致'))
					}
					callback()
				},
				trigger: 'blur'
			}
		]
	}
	handleClose(done) {
		this.changeShowStatus({ name: 'Registry', status: false })
		done()
	}
	existHandle() {
		this.user.account &&
			this.$refs.form.validateField('account', errMsg => {
				if (errMsg) {
					return
				}
				this.hasExisted(this.user.account).then(isHad => {
					this.isHad = isHad
					if (isHad) {
						this.tip('warning', '您输入的账号已被注册！', 2000)
					}
				})
			})
	}
	submitForm() {
		this.$refs.form.validate(valid => {
			if (valid) {
				if (!this.user.address.province) {
					return this.tip('warning', '请选择您所在的地区！')
				}
				if (this.isHad) {
					return this.tip('warning', '您输入的账号已被注册！', 2000)
				}
				this.isLoading = true
				this.registry(this.user).then(response => {
					this.isLoading = false
					if (!response.success) {
						return this.tip('error', response.message)
					}
					this.tip('success', response.message, 2000).then(() => {
						this.changeShowStatus({ name: 'Registry', status: false })
						this.changeShowStatus({ name: 'Login', status: true })
					})
				})
			} else {
				this.tip('error', '请仔细核对信息！')
				return false
			}
		})
	}
}
</script>

<style lang="stylus">
font-beautify()
	color #333
	font-weight 300
	text-decoration none
	transition all 0.5s
	text-shadow rgb(69, 45, 45) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 2px
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
.el-dialog__title
	font-size 150%
	letter-spacing 4px
	font-beautify()
.el-form-item__label
	letter-spacing 2px
	font-beautify()
.dialog
	box-shadow 0 10px 50px rgb(233, 233, 233)
	padding 2vw 2vw 0
	.form
		margin-left -3vw
	.dialog-footer
		margin-top -5vh
	.registry
		margin-right 3vw
		margin-bottom 3vh
	.captcha
		display inline-block
		width 52%
		text-align left
		margin-right 1.5vw
		transform translateY(-1.5vh)
</style>
