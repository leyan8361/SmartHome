<template lang="pug">
.user-search-component
	el-form.user-search(type="flex" justify="center" align="middle" :model="user" :rules="rules" ref="form" label-width="100px"  center status-ico)
		el-form-item.item-account(label="账号")
			el-input(type="text" v-model.trim="user.account" placeholder="账号 / 邮箱" clearable)
		el-row.invite(:span="24" type="flex" align="middle" justify="center")
			el-button(type="primary" @click="submitForm" :loading="isLoading" size="small") 查找用户
		el-row.user-search-tip(:span="24" tag="span")
			textra(:data="words" :timer="1" :sequence="true" :infinite="true")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {checkAccount} from '@/utils/form/check'
import {mapActions,mapState} from 'vuex'
import notice from '@/utils/ui/notice'
@Component({
	computed:{
		...mapState('user',['account','families'])
	},
	methods:{
		...mapActions('user',['search'])
	}
})

export default class UserSearch extends Vue{
	words = ['tip: 对方同意邀请后，您的智能家居将被共享。']
	user={ account:'' }
	rules = { account: checkAccount}
	isLoading = false
	created(){
		if(!this.families || !this.families.length){
			return notice.warning('您当前暂无家庭，请先创建一个家庭','错误',()=>{
				this.$router.push({name:'FamilyCreate'})
			})
		}
	}
	submitForm() {
		this.$refs.form.validate(valid => {
			if (valid) {
				if(this.user.account === this.account){
					return notice.error('不能添加自己为家人！')
				}
				this.isLoading = true
				this.search(this.user.account).then(response => {
					this.isLoading = false
					if (!response.success) {
						return notice.error(response.message)
					}
					notice.success(response.message,'成功').then(() => {
						this.$router.push({name:'FamilyInvite'})
					})
				})
			} else {
				notice.error('请仔细核对信息！')
				return false
			}
		})
	}
}
</script>

<style lang="stylus">
.user-search-component
	.el-form-item__label,.family-form-tip
		font-beautify()
	.el-form-item__label
		font-size 100%
	width 50%
	position relative
	top 25%
	left 21%
.item-account
	margin-bottom 30px
.invite
	margin-top 10%
	width 100%
	left 12%
	transform scale(1.2)
.user-search-tip
	font-beautify()
	position relative
	top 180px !important
	font-size 85% !important
	width 100%
	white-space:nowrap
</style>
