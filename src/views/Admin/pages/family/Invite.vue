<template lang="pug">
.family-invite-component
	.user-info
		el-row.user-avatar(:span="24" type="flex" align="middle" justify="center")
			img(:src="user.avatar")
		el-row(v-text="`昵称：${user.name}`" :span="24" tag="span" type="flex" align="middle" justify="center")
		el-row(v-text="`账号：${user.account}`" :span="24" tag="span" type="flex" align="middle" justify="center")
		el-row(v-text="`地址：${user.address}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-form.invite-form(type="flex" justify="center" align="middle" ref="form" label-width="100px"  center status-ico)
		el-form-item(label="验证消息")
			el-input(type="text" v-model.trim="message" :placeholder="`我是${name}`" clearable)
	el-row.invite-button(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm" :loading="isLoading") 邀请共享
	.family-form-tip-c
		textra(:data="words" :timer="1" :sequence="true" :infinite="true")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions,mapMutations} from 'vuex'
import notice from '@/utils/ui/notice'
import config from 'config/file'
@Component({
	computed:{
		...mapState('family',['result']),
		...mapState('user',['name','account'])
	},
	methods:{
		...mapActions('family',['invite']),
		...mapMutations('ui',['setFamilyTab']),
		...mapMutations('notice',['addNotice'])
	}
})
export default class FamilyInvite extends Vue{
	words = ['tip: 对方同意邀请后，您的智能家居将被共享。']
	user = {}
	isLoading = false
	message = ''
	created(){
		if(!this.result.account){
			this.$router.push({name:'UserSearch'})
		}
		this.user.avatar = this.result.avatar || config.avatar.user
		this.user.name = this.result.name || '*****'
		this.user.account = this.result.account
		this.user.address = this.result.address || '*****'
		this.getAddress()
	}
	getAddress(){
		const address = Object.values(this.result.address)
		if(!address || !address.length ){
			return this.user.address = '*****'
		}
		address.pop()
		this.user.address = address
	}
	submitForm() {
		this.isLoading = true
		const verification = {
			message:this.message || `我是${this.name}`,
			receiver:{name:this.result.name,account:this.result.account},
			sender:{name:this.name,account:this.account}
		}
		this.invite(verification).then(response => {
			this.isLoading = false
			if (!response.success) {
				return notice.error(response.message)
			}
			this.setFamilyTab('other')
			this.addNotice({...verification, type : 'family'})
			notice.success(response.message,'成功').then(() => {
				this.$router.push({name:'NoticeFamily'})
			})
		})
	}
}
</script>

<style lang="stylus">
.user-avatar img
	height 120px
	width 120px
	border-radius 50%
	box-shadow 0px 1px 20px 3px rgba(210, 201, 201, 0.7), 0 0 20px 2px #f6f6f6
	transition .3s
.user-info
	border-bottom 1px dotted #ccc

.user-info *
	padding 10px
	font-beautify()
	border-radius 2%
	&:not(:first-child):hover
		box-shadow rgba(0, 0, 0, 0.2) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 1px 4px
		transform translateY(-1px)
		transition .2s
	&:first-child
		&:hover
			transition .2s
			transform scale(1.05)
.invite-form
	padding-top 20px
	width 60%
	left 18%
	position relative
	font-beautify()
	.invite-button
		margin 0
.family-form-tip-c
	font-beautify()
	font-size 80%
	position relative
	margin-top 30px
	left 21%
</style>
