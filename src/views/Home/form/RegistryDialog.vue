<template lang="pug">
el-dialog(title="注册" :visible="isShowRegistry" width="25%" top="8vh" lock-scroll model  center custom-class="dialog" :before-close="handleClose")
	el-form.form(type="flex" justify="center" align="middle" :model="user" :rules="rules" ref="form" label-width="100px"  center status-ico)
		el-form-item(label="昵称" prop="name")
			el-input(type="text" v-model.trim="user.name" placeholder="2-8 位字符" clearable)
		el-form-item(label="账号" prop="account")
			el-input(type="text" v-model.trim="user.account" placeholder="账号 / 邮箱" clearable)
		el-form-item(label="密码" prop="password")
			el-input(type="password" v-model.trim="user.password" placeholder="6-12位 数字/字母/英文符号" clearable)
		el-form-item(label="确定密码" prop="checkpass")
			el-input(type="password" v-model.trim="user.checkpass" placeholder="6-12位 数字/字母/英文符号" clearable)
		el-form-item(label="所在地区" prop="selections")
			el-cascader(:options="CityInfo" v-model="user.selections" placeholder="请仔细填写地址" @change="fillAddress"  expand-trigger="hover" change-on-select clearable filterable )
		el-form-item(label="验证码" prop="captcha")
			el-tooltip(effect="light" content="输入验证码的计算结果" placement="bottom" :disabled='disable')
				el-input.captcha(type="text" v-model.trim.number="user.captcha" @change='disable=true')
			img(:src="captchaUrl" alt="Captcha" @click="captchaUrl=captchaUrl+'?d='+Date()")
	.dialog-footer(slot="footer")
		el-row
			el-button.registry(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在注册") 注册
			el-button(@click="selections = [],$refs.form.resetFields()") 重置
		el-row
			el-button(type="text" @click="replaceRegistry") 登录已有账号
</template>

<script>
import config from 'config'
import { mapState, mapMutations } from 'vuex'
import {
	checkAccount,
	checkPassword,
	checkName,
	checkAddress
} from '@/utils/form'
import CityInfo from '@/assets/js/city'
import Regular from '@/utils/regular'

export default {
	name: 'RegistryDialog',
	data: function() {
		return {
			user: {
				name: '',
				account: '',
				password: '',
				checkpass: '',
				selections: [],
				address: {
					province: '',
					city: '',
					county: ''
				},
				captcha:''
			},
			captchaUrl:config.requestUrl+'captcha',
			disable:false,
			rules: {
				name: checkName,
				account: checkAccount,
				password: [
					{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入密码'))
							}
							if (!Regular.password(value)) {
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
							if (!Regular.password(value)) {
								return callback(new Error('密码为 6-12 位格式'))
							}
							if (value !== this.user.password && this.user.password) {
								return callback(new Error('您两次输入的密码不一致'))
							}
							callback()
						},
						trigger: 'blur'
					}
				],
				selections: [
					{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请选择您所在的地区'))
							}
							callback()
						},
						trigger: 'change'
					}
				],
				captcha:[
					{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入验证码'))
							}
							callback()
						},
						trigger: 'blur'
					}
				]
			},

			isLoading: false,
			CityInfo,
		}
	},
	computed: {
		...mapState('dialog', ['isShowRegistry']),
	},
	methods: {
		...mapMutations('dialog', ['changeShowStatus', 'replaceRegistry']),
		handleClose(done) {
			this.changeShowStatus({ name: 'Registry', status: false })
			done()
		},
		registry() {
			// const newUser = new User(
			// 	this.user.name,
			// 	this.user.account,
			// 	this.user.password,
			// 	this.user.address
			// )


		},
		fillAddress() {
			this.user.address.province = this.selections[0]
			this.user.address.city = this.selections[1]
			this.user.address.county = this.selections[2]
		},
		submitForm() {
			this.$refs.form.validate(valid => {
				if (valid) {
					this.isLoading = true
					this.registry()
				} else {
					this.$alert('<strong>请仔细核对信息</strong>', '信息错误', {
						type: 'error',
						center: true,
						dangerouslyUseHTMLString: true
					})
					return false
				}
			})
		},
	}
}
</script>

<style lang="stylus">
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
