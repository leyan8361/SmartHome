<template lang="pug">
.user-modify(type="flex" justify="center" align="middle")
	.avatar-wrap-form: avatar-upload(:avatar.sync="user.avatar")
	el-form.user-form(type="flex" justify="center" align="middle" :model="user" :rules="rules" ref="form" label-width="100px"  center status-ico)
		el-form-item(label="昵称" prop="name")
			el-input(type="text" v-model.trim="user.name" placeholder="2-8 位字符" clearable)
		el-form-item(label="密码" prop="password")
			el-input(type="password" v-model.trim="user.password" placeholder="6-12位 数字/字母/英文符号" clearable)
		el-form-item(label="确定密码" prop="checkpass")
			el-input(type="password" v-model.trim="user.checkpass" placeholder="6-12位 数字/字母/英文符号" clearable)
		el-form-item(label="所在地区")
			city-select(:address.sync="user.address" :is-init="isInit")
		el-form-item(label="隐私选项")
			private-select(:private.sync="user.private")
		el-row.registry(:span="24" type="flex" align="middle" justify="space-around")
			el-button(type="primary" @click="submitForm" :loading="isLoading") 更新
			el-button(@click="isInit=true,$refs.form.resetFields()") 重置
		el-row.user-form-tip(:span="24" tag="span") tip: 只会更新已更改的信息。
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapMutations, mapActions } from 'vuex'

import Regular from '@/utils/tool/regular'
import tip from '@/utils/ui/tip'
import CitySelect from '~/CitySelect.vue'
import PrivateSelect from '~/PrivateSelect.vue'
import AvatarUpload from '~/AvatarUpload.vue'
@Component({
	components: {
		CitySelect,
		AvatarUpload,
		PrivateSelect
	},
	computed: {
		...mapState('user', ['name'])
	},
	methods:{
		...mapActions('user', ['modify'])
	}
})
export default class ModifyInfo extends Vue {
	user = {
		name: '',
		password: '',
		checkpass: '',
		address: {
			province: '',
			city: '',
			county: '',
			code:''
		},
		avatar: null,
		private:[]
	}
	selections = []
	isLoading = false
	isInit = false
	rules = {
		name:  [ { validator: (rule, value, callback) => { if (!value) { return callback() } if (value.length > 10) { return callback(new Error('昵称长度不能超过 10 位')) } if (value.length < 2) { return callback(new Error('昵称长度不能少于 2 位')) } if (!Regular('name', value)) { return callback(new Error('昵称只能包含字母，数字，下划线，减号')) } callback() }, trigger: 'blur' } ],
		password: [ { validator: (rule, value, callback) => { if (!value) { if(!this.user.checkpass){ return callback() } return callback(new Error('请输入密码！')) } if (!Regular('password', value)) { return callback(new Error('密码为 6-12 位格式')) } if (this.user.checkpass) { this.$refs.form.validateField('checkpass') } callback() }, trigger: 'blur' } ],
		checkpass: [ { validator: (rule, value, callback) => { if (!value) { if(!this.user.password){ return callback() } return callback(new Error('请输入密码！')) } if (!Regular('password', value)) { return callback(new Error('密码为 6-12 位格式')) } if (value !== this.user.password && this.user.password) { return callback(new Error('您两次输入的密码不一致')) } callback() }, trigger: 'blur' } ]
	}
	toModify(updatedInfo) {
		if(Object.keys(updatedInfo).length === 0){
			this.isLoading = false
			return tip.info('你让我改啥啊，凶~')
		}
		this.modify(updatedInfo).then(response => {
			this.isLoading = false
			if (!response.success) {
				return tip.error(response.message)
			}
			tip.success(response.message, 2000)
			/* 刷新页面，重新获取用户信息 */
			this.$router.go(0)
		})
	}
	submitForm() {
		this.$refs.form.validate(valid => {
			if (valid) {
				let updatedInfo = {}
				if(this.user.name !== this.name && this.user.name){
					updatedInfo.name = this.user.name
				}
				if(this.user.address.province){
					updatedInfo.address = this.user.address
				}
				if(this.user.password){
					/* 重新设置 Token */
					updatedInfo.password = this.user.password
				}
				if(this.user.private.length>0){
					this.user.private.includes('public') && (this.user.private = [])
					updatedInfo.private = this.user.private
				}
				this.isLoading=true
				if (this.user.avatar) {
					/* 重新生成图片 */
					const reader = new FileReader()
					reader.readAsDataURL(this.user.avatar)
					reader.onloadend = () => {
						updatedInfo.avatar = reader.result
						this.toModify(updatedInfo)
					}
				} else {
					this.toModify(updatedInfo)
				}
			} else {
				tip.error('请仔细核对信息！')
				return false
			}
		})
	}
}
</script>

<style lang="stylus">
@import '../../../../assets/css/func'
.user-modify
	position relative
	width 100%
	height 100%
.user-form
	width 55%
	margin-top 80px
	.el-form-item__label
		letter-spacing 2px
		font-beautify()
		padding 3px 10px
.avatar-wrap-form
	position relative
	top 30px
	font-size 80%
	left 50%
	.el-upload-list__item-preview
		display none !important
	.el-upload-list__item-delete
		margin-left -4px !important
		transform scale(1.5)
.user-form-tip
	top 30px
	font-beautify()
	font-size 70%
	position relative
	color #999
</style>
