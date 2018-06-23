<template lang="pug">
el-dialog(title="触发条件" :visible="isShowCoditionForm"  width="28%" top="10vh" custom-class="bulb-dialog"
lock-scroll center append-to-body :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false")
	el-form(:span="24" type="flex" align="middle" justify="center" :model="codition" label-width="100px"  center status-ico)
		el-form-item(label="触发时间")
			el-time-picker.time-picker(v-model="codition.startExec" placeholder="请选择触发指令的时间")
		el-form-item(label="天气条件")
			codition-weather(:weather.sync="codition.weather")
		el-form-item(label="条件关系")
			el-tooltip(content="如果开启，则以上条件全部成立才会执行指令；反之，只要满足其一" :disabled="disableCount===3")
				el-switch(v-model="codition.relation" @change="disableCount++" active-color="#ff4949" inactive-color="#13ce66" active-text="全部成立" inactive-text="单独满足")
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button(type="primary" @click="submitForm") 保存条件
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import CoditionWeather from '~/scripts/CoditionWeather'
import notice from '@/utils/ui/notice'
import { mapMutations } from 'vuex'

@Component({
  components:{
    CoditionWeather
  },
	props:{
		isShowCoditionForm:{
			type:Boolean,
			required:false,
			default:false
		},
		codition:{
			type:Object,
			required:true
		}
	},
	methods:{
		...mapMutations('ui',['finishScriptForm'])
	}
})
export default class CoditionForm extends Vue{
	disableCount = 0
	verify(){
		if(!this.codition.startExec && !this.codition.weather.length){
			return false
		}
		return true
	}
	submitForm(){
		if(!this.verify()){
			return notice.warning('请选择一个条件','错误')
		}
		if(this.codition.weather && this.codition.weather.length > 0){
			if(this.codition.weather.includes('晴天') && this.codition.weather.includes('阴天')){
				return notice.warning('晴天与阴天不能同时选择哦','错误')
			}
		}
		this.finishScriptForm({isFinish:true,id:2})

		this.$emit('update:codition',this.codition)
		this.$emit('update:isShowCoditionForm', false)

	}
}
</script>

<style lang="stylus">
.time-picker
	width 99% !important
</style>
