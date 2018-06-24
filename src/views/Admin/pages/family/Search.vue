<template lang="pug">
.family-search
	el-form.family-search-form(type="flex" justify="center" align="middle" :model="family" label-width="100px"  center status-ico)
		el-form-item(label="家庭名字")
			el-input(type="text" v-model.trim="family.name" placeholder="创建家庭时，独一无二的家庭名字" clearable)
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm" :loading="isLoading") 查找家庭
	el-row.family-search-tip
		textra(:data="words" :timer="1" :sequence="true" :infinite="true")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapActions,mapState} from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	computed:{
		...mapState('user',['families'])
	},
	methods:{
		...mapActions('family',['search'])
	}
})
export default class FamilySearch extends Vue{
	words = ['只有家庭管理员同意之后，方可加入家庭','加入之后，您可共享家庭成员的电器','可以寻求家庭创建者，授予您管理员权限']
	family= {
		name:''
	}
	isLoading = false
	verify(){
		if(!this.family.name){
			return false
		}
		if(this.family.name.length > 8){
			notice.warning('您输入的用户名太长')
			return false
		}
		if(this.families && [].find.call(this.families ,e=>e.name === this.family.name)){
			notice.warning('您已加入了该家庭')
			return false
		}
		return true
	}
	submitForm(){
		if(!this.verify()){
			return
		}
		this.isLoading = true
		this.search(this.family.name).then(response => {
			this.isLoading = false
			if (!response.success) {
				return notice.warning(response.message)
			}
			notice.success(response.message,'成功').then(() => {
				this.$router.push({name:'FamilyJoin'})
			})
		})
	}
}
</script>

<style lang="stylus">
.family-search
	padding 150px
	font-beautify()
	&-form
		width 400px
		margin-bottom 40px
	&-tip
		position fixed
		font-size .9em
		top 130px
</style>
