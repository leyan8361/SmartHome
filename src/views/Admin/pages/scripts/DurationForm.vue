<template lang="pug">
el-dialog(title="持续时间" :visible="isShowDurationForm" width="35%" top="10vh" custom-class="bulb-dialog"
lock-scroll center append-to-body :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false")
	el-form(:model="duration" label-width="100px"  center status-ico)
		el-form-item(label="开始执行")
			el-cascader(:disabled="duration.specificDuration!==null" v-model="duration.startDuration" placeholder="请选择执行指令的时间" :options="times" clearable)
		el-form-item(label="结束执行")
			el-tooltip(content="如果未选择该选项，默认无结束时间")
				el-cascader(:disabled="duration.startDuration.length<2 || duration.specificDuration!==null" v-model="duration.endDuration" placeholder="请选择结束指令的时间" :options="weaks" clearable)
		el-form-item(label="指定执行")
			el-tooltip(content="如果设置该选项，以上两项默认失效")
				el-date-picker(v-model="duration.specificDuration"
				type="daterange" start-placeholder="开始日期" end-placeholder="结束日期")
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm") 保存时间
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import notice from '@/utils/ui/notice'

@Component({
	props:{
		isShowDurationForm:{
			type:Boolean,
			required:false,
			default:false
		},
		duration:{
			type:Object,
			required:true
		}
	},
	methods:{
		...mapMutations('ui',['finishScriptForm'])
	}
})
export default class DurationForm extends Vue{
	firstSave = false
	weaks = [{
			value:'每周一',label:'每周一'
		},{
			value:'每周二',label:'每周二'
		},{
			value:'每周三',label:'每周三'
		},{
			value:'每周四',label:'每周四'
		},{
			value:'每周五',label:'每周五'
		},{
			value:'每周六',label:'每周六'
		},{
			value:'每周日',label:'每周日'
	}]
	times = [
		{value:'每天',label:'每天'},
		{value:'仅今天',label:'仅今天'},
		{value:'仅明天',label:'仅明天'},
		{value:'仅后天',label:'仅后天'},
		{value:'每周',label:'每周',children:[{
			value:'每周一',label:'每周一'
		},{
			value:'每周二',label:'每周二'
		},{
			value:'每周三',label:'每周三'
		},{
			value:'每周四',label:'每周四'
		},{
			value:'每周五',label:'每周五'
		},{
			value:'每周六',label:'每周六'
		},{
			value:'每周日',label:'每周日'
	}]}]
	verify(){
		if(!this.duration.startDuration && !this.duration.specificDuration){
			return false
		}
		return true
	}
	submitForm(){
		if(!this.verify()){
			return notice.warning('请选择一个时间','错误')
		}
		if(this.duration.startDuration && this.duration.startDuration.length === 2){
			const day = this.duration.startDuration[1]
			if(this.duration.endDuration && this.duration.endDuration.length !== 0){
				if(day === this.duration.endDuration[0]){
					return notice.warning('不能选择相同星期','错误')
				}
			}
		}
		this.finishScriptForm({isFinish:true,id:3})
		this.$emit('update:isShowDurationForm', false)
		this.$emit('update:duration',this.duration)
		!this.firstSave && notice.success('保存成功！快去增加您的指令吧~','成功') && (this.firstSave = true)
	}
}
</script>

<style lang="stylus">

</style>
