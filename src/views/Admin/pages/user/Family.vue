<template lang="pug">
.user-family-component
	el-table.family-table(v-if="families.length!==0" :data="members" :height="470" stripe)
		el-table-column(label="家庭")
			template(slot-scope="scope")
				el-popover(trigger="hover" placement="top")
					p 家庭名称：{{scope.row.family.name}}
					p 展示名称：{{scope.row.family.displayName}}
					.name-wrapper(slot="reference")
						el-tag(size="medium" type="danger") {{scope.row.family.displayName}}
		el-table-column(label="成员")
			template(slot-scope="scope")
				el-popover(trigger="hover" placement="top")
					p 账号：{{scope.row.user.account}}
					p 昵称：{{scope.row.user.name}}
					.name-wrapper(slot="reference")
						el-tag(size="medium" type="info") {{scope.row.user.name}}
		el-table-column(prop="tag" label="权限"  width="100"
      :filters="[{ text: '成员', value: '成员' }, { text: '管理员', value: '管理员' },{ text: '创建者', value: '创建者' }]"
			:filter-method="filterTag" filter-placement="bottom-end")
			template(slot-scope="scope")
				el-tag(:type="scope.row.tag === '创建者' ? 'primary' : scope.row.tag === '成员'?'success':'warning'") {{scope.row.tag}}
	.families-is-null(v-else)
		el-row(:span="24" type="flex" align="middle" justify="center")
			| 您当前暂无家庭哦
		el-row(:span="24" type="flex" align="middle" justify="center")
			| 自己创建一个家庭吧！
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button(type="success" @click.native.prevent="$router.push({name:'FamilyCreate'})" round) 马上创建
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
		...mapActions('family',['member'])
	},
	watch:{
		'$route'(){
			this.toInit()
		}
	}
})
export default class UserFamily extends Vue{
	members = []
	filterTag(value, row) {
		return row.tag === value
	}
	created(){
		this.toInit()
	}
	toInit(){
		const families = this.families.map(e=>e.name)
		this.member(families).then(e=>{
			if(e.success){
				this.members = e.members
			}
		})
	}
}
</script>

<style lang="stylus">
.family-table
	box-shadow 0 2px 10px #ccc
	border-radius 5px
	margin-top 20px
.user-family-component
	font-beautify()
	.families-is-null
		margin 150px
		& *
			padding 15px
</style>
