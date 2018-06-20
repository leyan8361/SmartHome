<template lang="pug">
.electric-setting-component
	.scripts-list
		el-table(v-if="scripts.length!==0" :data="scripts" :row-class-name="disableRowClass" stripe)
			el-table-column(label="电器信息")
				el-table-column(prop="name" label="备注")
				el-table-column(prop="id" label="ID")
			el-table-column(label="指令操作")
				el-table-column(prop="status" label="状态")
				el-table-column(prop="brightness" label="亮度")
				el-table-column(prop="color" label="颜色")
			el-table-column(label="触发条件")
				el-table-column(prop="time" label="时间")
				el-table-column(prop="weather" label="天气")
			el-table-column(prop="duration" label="触发时间")
			el-table-column(fixed="right" label="操作" width="200")
				template(slot-scope="scope")
					el-button(@click.native.prevent="updateScript(scope.$index)" type="primary" size="mini") 修改
					el-button(@click.native.prevent="disableScript(scope.$index)" type="primary" size="mini") 禁用
					el-button(@click.native.prevent="deleteScript(scope.$index)" type="danger" size="mini") 删除
		.when-script-is-null(v-else :span="24" type="flex" align="middle" justify="center")
			el-row
				| 目前暂无指令哦
	.script-add-button(:span="24" type="flex" align="middle" justify="center")
		el-button(type="success" @click.native.prevent="$router.push({name:'ElectricScripts'})" round) 增加指令
	.electric-setting-tip
		el-row
			| 设置触发条件，将自动执行您的指令。
		el-row
			| 比如：下班之后时间开灯、阴天自动开灯、根据睡觉时间，自动关灯等。
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapActions} from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	computed:{
		...mapState('scripts',['scripts'])
	},
	methods:{
		...mapActions('scripts',['disableScriptByIndex','deleteScriptByIndex','addScript'])
	}
})
export default class ElectricSetting extends Vue{

	disableRowClass({row,rowIndex}){
		if(!this.scripts[rowIndex]){
			return 'disable-row'
		}
	}
	disableScript(index){
		this.disableScriptByIndex(index).then(e=>{
			if(e.success){
				notice.success(e.message,'成功')
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
	deleteScript(index){
		this.deleteScriptByIndex(index).then(e=>{
			if(e.success){
				notice.success(e.message,'成功')
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
	updateScript(index){

	}

}
</script>

<style lang="stylus">
.electric-setting-component
	font-beautify()
.electric-setting-tip
	position fixed
	font-size .8em
	bottom 60px
	padding-left 10px
	& *
		padding 5px 0
.disable-row
	opacity .8
	cursor not-allowed
.when-script-is-null
	margin 150px auto 50px

</style>
