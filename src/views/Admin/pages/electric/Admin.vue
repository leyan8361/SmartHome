<template lang="pug">
.electric-admin-component
	el-table.electrics-admin-table(:data="bulbs" v-if="bulbs.length!==0" stripe height="450")
		el-table-column(prop="name" label="备注")
		el-table-column(prop="id" label="ID")
		el-table-column(prop="showStatus" label="状态")
		el-table-column(prop="brightness" label="亮度")
		el-table-column(prop="color" label="颜色")
		el-table-column(fixed="right" label="操作" width="200")
			template(slot-scope="scope")
				el-button(@click.native.prevent="renameElectric(scope.$index)" type="primary" size="mini") 重命名
				el-button(@click.native.prevent="deleteElectric(scope.$index)" type="danger" size="mini") 删除
	.when-bulbs-is-null(v-else :span="24" type="flex" align="middle" justify="center")
		| 您目前还没有自己的电器哦~
		.electric-add(:span="24" type="flex" align="middle" justify="center")
			el-button(type="success" @click.native.prevent="$router.push({name:'ElectricAdd'})" round) 增加电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	computed:{
		...mapState('electrics',['bulbs'])
	},
	methods:{
		...mapActions('electrics',['deleteBulb','renameBulb'])
	}
})
export default class ElectricAdmin extends Vue{
	deleteElectric(index){
		this.deleteBulb(this.bulbs[index].id).then(e=>{
			if(e.success){
				notice.success(e.message,'成功')
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
	renameElectric(index){
		this.$prompt('请输入该电器新的备注','重命名',{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			inputPattern: /^.{1,16}$/,
			inputErrorMessage: '请输入合法名字'
		}).then(({value:name})=>{
			const bulb = {id:this.bulbs[index].id,name}
			this.renameBulb(bulb).then(e=>{
				if(e.success){
					notice.success(e.message,'成功')
				}else{
					notice.error(e.message,'失败')
				}
			})
		}).catch(()=>{})
	}
}
</script>

<style lang="stylus">
.electric-admin-component
	margin-top 20px
	padding 0px
	font-beautify()
.electric-add
	margin-top 50px
.when-bulbs-is-null
	margin 150px auto 50px
.electrics-admin-table
	box-shadow 0 2px 10px #ccc
	border-radius 5px
</style>
