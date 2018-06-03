<template lang="pug">
el-dialog(title="登录" :visible="isShowLogin" width="25%" top="15vh" custom-class="dialog" :before-close="handleClose" lock-scroll model  center)
	el-form.form(type="flex" justify="center" align="middle" :model="user" :rules="rules" ref="form" center status-icon label-width="100px")
		el-form-item(label="账号" prop="account")
			el-input(type="text" v-model.trim="user.account" auto-complete='on' placeholder="账号 / 邮箱" clearable)
		el-form-item(label="密码" prop="password")
			el-input(type="password" v-model.trim="user.password" placeholder="6-12位 数字/字母/英文符号" clearable ref="passInput")
		el-checkbox.checkbox(v-model="keep" checked) 下次自动登录
	.dialog-footer(slot="footer")
		el-row
			el-button.login(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在登录") 登录
			el-button(@click="$refs.form.resetFields()") 重置
		el-row.last-line
			el-button.forgetPwd(type="text" @click="forgetPwd") 找回密码
			el-button.registry(type="text" @click="replaceLogin") 免费注册
</template>

<script>
import { Vue, Component} from 'vue-property-decorator'

import { mapState, mapMutations, mapActions } from 'vuex'
import { checkAccount, checkPassword } from '@/utils/form/check'
import tip from '@/utils/ui/tip'
@Component({
	computed: {
		...mapState('dialog', ['isShowLogin']),
		...mapState('user', ['account'])
	},
	methods: {
		...mapMutations('dialog', ['changeShowStatus', 'replaceLogin']),
		...mapMutations('user', ['Keep']),
		...mapActions('user', ['login'])
	},
	watch:{
		isShowLogin(isShow){
			isShow && this.Init()
		}
	}
})
export default class LoginDialog extends Vue {
	user = {
		account: '',
		password: ''
	}
	rules = {
		account: checkAccount,
		password: checkPassword
	}
	isLoading = false
	keep = true
	Init(){
		this.user.account = this.account || ''
		this.refs.passInput.focus()
	}
	handleClose(done) {
		this.changeShowStatus({ name: 'Login', status: false })
		done()
	}
	submitForm() {
		this.$refs.form.validate(valid => {
			if (valid) {
				this.isLoading = true
				this.Keep(this.keep)
				this.login(this.user).then(response => {
					this.isLoading = false
					if (!response.success) {
						return tip.error(response.message)
					}
					tip.success(response.message).then(() => {
						this.$router.push({ path: '/home', name: 'Home'})
					})
				})
			} else {
				tip.error('请仔细核对信息！')
				return false
			}
		})
	}
	forgetPwd() {
		/* 已给您的手机号或者邮箱发送验证码 */
		/* 输入验证码，默认123456 */
		/* 验证正确，跳转到修改密码界面 */
		/* 错误警告 */
	}
}
</script>

<style lang="stylus" scoped>
.dialog
	box-shadow 0 10px 50px rgb(233, 233, 233)
	.form
		margin-left -3vw
	.checkbox
		margin-left 3vw
	.dialog-footer
		margin-top -2vh
	.last-line
		margin-left 3vw
	.login
		margin-right 3vw
		margin-bottom 3vh
	.forgetPwd
		color #999
	.forgetPwd:after
		color transparent
		text-shadow 0 0 1px #ccc
		content ' | '
		position relative
		left 3px
</style>
