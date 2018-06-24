<template lang="pug">
.family-create-component
	el-form.family-form(:model="family" label-width="100px"  center status-ico)
		avatar-upload.avatar-upload-component(:avatar.sync="family.avatar")
		el-form-item(label="家庭名字")
			el-input(v-model.trim="family.name" type="text" placeholder="提供给用户搜索的名字" clearable @change="existHandle")
		el-form-item(label="展示名字")
			el-tooltip(content="如果未提供展示名字，则默认为家庭名字" :disabled="disabled")
				el-input(v-model.trim="family.displayName" type="text" placeholder="展示给家庭成员的名字" clearable @input="disabled=true")
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在创建") 创建家庭
	.family-create-tip(:span="24" type="flex" align="middle" justify="center")
		el-row
			textra(:data="words" :timer="1.1" :sequence="true" :infinite="true")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapActions} from 'vuex'
import AvatarUpload from '~/form/AvatarUpload'
import notice from '@/utils/ui/notice'

@Component({
	components:{
		AvatarUpload
	},
	methods:{
		...mapActions('family',['hasExisted','create'])
	}
})
export default class FamilyCreate extends Vue{
	disabled=false
	family={
		name:'',
		displayName:'',
		avatar:''
	}
	hasExistedWithName = false
	words=['提供给用户搜索的名字不可重复~','如果未提供展示名字，则默认家庭名字','可以选择所要共享的设备~']
	isLoading = false
	existHandle(){
		if(!this.family.name){
			return
		}
		this.hasExisted(this.family.name).then(e=>{
			if(e.success){
				this.hasExistedWithName = e.hasExisted
				e.hasExisted && notice.warning('您的家庭名字已被人注册','错误')
			}
		})
	}
	verify(){
		if(!this.family.name){
			notice.warning('请输入家庭名字','错误')
			return false
		}
		if(this.family.name.length > 8){
			notice.warning('家庭名字过长哦','错误')
			return false
		}
		if(this.family.displayName && this.family.displayName.length > 8){
			notice.warning('家庭名字过长哦','错误')
			return false
		}
		if(this.hasExistedWithName){
			notice.warning('您的家庭名字已被人注册','错误')
			return false
		}
		return true
	}
	toCreate(family){
		this.create(family).then(e=>{
			if(e.success){
				notice.success(e.message,'成功').then(()=>{
					this.$router.push({name:'FamilyAdmin'})
				})
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
	submitForm(){
		if(!this.verify()){
			return
		}
		const family = this.family
		if(this.family.avatar){
				/* 重新生成图片 */
				const reader = new FileReader()
				reader.readAsDataURL(this.family.avatar)
				reader.onloadend = () => {
					family.avatar = reader.result
					this.toCreate(family)
				}
		}else{
			this.toCreate(family)
		}
	}
}
</script>

<style lang="stylus">
.family-create-component
	padding 150px 50px
	font-beautify()
	.avatar-upload-component
		position absolute
		left 49%
		top 40%
.family-form
	width 380px
	margin-left 80px
	margin-bottom 40px
.family-create-tip
	position fixed
	bottom 60px
	margin-left 160px
	font-size .9em
</style>
