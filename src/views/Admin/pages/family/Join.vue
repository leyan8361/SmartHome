<template lang="pug">
.family-join-component
	.family-join-info
		el-row.family-join-avatar(:span="24" type="flex" align="middle" justify="center")
			img(:src="result.avatar")
		el-row(v-text="`家庭名称：${result.displayName}`" :span="24" tag="span" type="flex" align="middle" justify="center")
		el-row(v-text="`展示名称：${result.name}`" :span="24" tag="span" type="flex" align="middle" justify="center")
		el-row(v-text="`创建者：${result.founder}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-form.family-join-form(type="flex" justify="center" align="middle" label-width="100px"  center status-ico)
		el-form-item(label="验证消息")
			el-input(type="text" v-model.trim="message" :placeholder="`我是${name}`" clearable)
	el-row.family-join-button(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm" :loading="isLoading") 加入家庭
	el-row.family-join-tip
		textra(:data="words" :timer="1" :sequence="true" :infinite="true")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions} from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	computed:{
		...mapState('family',['result']),
		...mapState('user',['name','account'])
	},
	methods:{
		...mapActions('family',['join'])
	}
})
export default class FamilyJoin extends Vue{
	words = ['只有家庭管理员同意之后，方可加入家庭','加入之后，您可共享家庭成员的电器','可以寻求家庭创建者，授予您管理员权限']
	isLoading = false
  message = ''
	created(){
		if(!this.result.name){
			this.$router.push({name:'FamilySearch'})
		}
	}
	submitForm(){
    this.isLoading = true
		const verification = {
			message:this.message || `我是${this.name}`,
			receiver:{
				name:this.result.name,
				displayName:this.result.displayName
			},
      sender:{
				name:this.name,
				account:this.account
			}
		}
		this.join(verification).then(response => {
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
.family-join-avatar img
	height 120px
	width 120px
	border-radius 50%
	box-shadow 0px 1px 20px 3px rgba(210, 201, 201, 0.7), 0 0 20px 2px #f6f6f6
	transition .3s
.family-join-info
	border-bottom 1px dotted #ccc

.family-join-info *
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
.family-join-form
	padding-top 20px
	width 60%
	left 18%
	position relative
	font-beautify()
	.family-join-button
		margin 0
.family-join-tip
	font-beautify()
	font-size 80%
	position relative
	margin-top 40px
	left 25%
</style>
