<template lang="pug">
.electric-admin-component
	el-table.electrics-admin-table(:data="bulbs" v-if="bulbs.length!==0" stripe)
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
		el-button(type="success" @click.native.prevent="isShowAddDialog=true" round) 增加电器
	bulb-add(:is-show-add-dialog.sync="isShowAddDialog")
	.bulb-add-tip
		h3.bulb-add-tip-title: | 增加电器前提
		el-row
			| 1. 电器已连接家中局域网
		el-row
			| 2. 如果想单独控制电器，电器的 id 号 需与已有电器的 id 号互不相同
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions } from 'vuex'
import BulbAdd from '@/views/Admin/form/BulbAdd'
import notice from '@/utils/ui/notice'

@Component({
	computed:{
		...mapState('electrics',['bulbs'])
	},
	components:{
		BulbAdd
	},
	methods:{
		...mapActions('electrics',['deleteBulb','renameBulb'])
	}
})
export default class ElectricAdmin extends Vue{
	isShowAddDialog = false
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
	padding 20px
	font-beautify()
.electric-add
	margin-top 50px
.bulb-add-tip
	font-size .8em
	position fixed
	bottom 60px
	& *
		padding 5px 0
.when-bulbs-is-null
	margin 100px auto 50px

</style>
