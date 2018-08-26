<template lang="pug">
el-dialog(title="登录" :visible="isShowLogin" width="26%" top="15vh" custom-class="dialog" :before-close="handleClose" lock-scroll model  center)
	el-form.form(type="flex" justify="center" align="middle" :model="user" :rules="rules" ref="form" center status-icon label-width="100px")
		el-form-item(label="账号" prop="account")
			el-input(type="text" v-model.trim="user.account" auto-complete='on' placeholder="手机号 / 邮箱" clearable)
		el-form-item(label="密码" prop="password")
			el-input(type="password" v-model.trim="user.password" placeholder="6-12位 数字/字母/英文符号" clearable ref="passInput")
		el-checkbox.checkbox(v-model="keep" checked) 下次自动登录
	.dialog-login-footer(slot="footer")
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
import Regular from '@/utils/regular'

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
			isShow && this.account && this.Init()
		}
	}
})
export default class HomeLogin extends Vue {
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
						this.$router.push({ name: 'Home'})
					})
				})
			} else {
				tip.error('请仔细核对信息！')
				return false
			}
		})
	}
	forgetPwd() {
		this.$prompt('请输入您的账号', '忘记密码', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputErrorMessage: '账号应为手机或邮箱格式',
				inputPlaceholder: '手机号 / 邮箱',
				inputValidator(value){
					return Regular('mobile', value) || Regular('email', value)
				}
		}).then(({ value }) => {
			const deviceInfo = Regular('mobile', value) ? ['手机','短信'] : ['邮箱','邮件']
			const tipInfo = `我们已给您的${deviceInfo[0]}发送了一封${deviceInfo[1]},请点击${deviceInfo[1]}的链接,修改密码`
			tip.success(tipInfo)
		}).catch()
	}
}
</script>

<style lang="stylus">
.dialog
	box-shadow: 0 10px 50px rgb(233, 233, 233) !important;
	border-radius: 10px !important;
	.form
		margin-left -4vw !important
	.checkbox
		margin-left 3vw !important
	.dialog-login-footer
		margin-top -2vh !important
	.last-line
		margin-left 3vw !important
		margin-top 2vh !important
	.login
		margin-right 3vw !important
	.forgetPwd
		color #999
	.forgetPwd:after
		color transparent
		text-shadow 0 0 1px #ccc
		content ' | '
		position relative
		left 3px
</style>
