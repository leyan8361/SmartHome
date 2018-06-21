<template lang="pug">
.electric-script-admin
	el-steps(:active="scriptFormFinishCount" finish-status="success" align-center )
		el-step(title="操作指令" description="指令的具体操作，可控制多个电器")
		el-step(title="触发条件" description="触发指令的条件，可选择特定的时间、天气等因素")
		el-step(title="执行时间" description="执行指令的时间，可指定某一时间范围、每周的某一天等")
	.add-script-setting
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button(@click.native="isShowOperatingForm=true" round) 操作指令
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button(:class="{'is-disabled':scriptFormFinishCount<1}" @click.native="scriptFormFinishCount<1?$notify({type:'warning',title: '别急',message: '请先完成操作指令表单',duration:1000}):isShowCoditionForm=true" round) 触发条件
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button(:class="{'is-disabled':scriptFormFinishCount<2}" @click.native="scriptFormFinishCount<2?$notify({type:'warning',title: '别急',message: '请先完成之前表单',duration:1000}):isShowDurationForm=true" round) 持续时间
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.submit-button(:class="{'is-disabled':scriptFormFinishCount<3}" type="success" @click="submitForm" v-loading.fullscreen.lock="isLoading" element-loading-text="正在增加") 增加指令
	operating-form(:is-show-operating-form.sync="isShowOperatingForm" :operating.sync="operating")
	codition-form(:is-show-codition-form.sync="isShowCoditionForm" :codition.sync="codition")
	duration-form(:is-show-duration-form.sync="isShowDurationForm" :duration.sync="duration")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapActions ,mapState,mapMutations } from 'vuex'

import OperatingForm from '@/views/Admin/pages/scripts/OperatingForm'
import CoditionForm from '@/views/Admin/pages/scripts/CoditionForm'
import DurationForm from '@/views/Admin/pages/scripts/DurationForm'
import notice from '@/utils/ui/notice'

@Component({
	components: {
		OperatingForm,
		CoditionForm,
		DurationForm
	},
	methods:{
		...mapActions('scripts',['addScript']),
		...mapMutations('scripts',['setScripts']),
		...mapMutations('ui',['finishFormCountToZero'])
	},
	computed:{
		...mapState('ui',['scriptFormFinishCount']),
		...mapState('user',['address'])
	}
})
export default class ScriptIndex extends Vue{
	isShowOperatingForm=false
	isShowCoditionForm=false
	isShowDurationForm=false

	operating = {
		ids:[],
		name:[],
		status:true,
		brightness:100,
		color:'自然光'
	}
	codition = {
		startExec:null,
		weather:[],
		relation:false
	}
	duration = {
		startDuration:['每天'],
		endDuration:null,
		specificDuration:null
	}
	script = {}
	isLoading = false

	submitForm() {
		if(this.scriptFormFinishCount < 3){
			return notice.warning('请先完成所有表单','别急')
		}
		this.isLoading = true
		this.script = {
			scriptID:Date.now(),
			address:this.address.code,
			...this.operating,
			...this.codition,
			...this.duration
		}
		this.addScript(this.script).then(e=>{
			this.isLoading = false
			console.log(e.scripts)
			if(e.success){
				this.setScripts(e.scripts)
				notice.success(e.message,'成功')
				this.finishFormCountToZero()
			}else{
				notice.error(e.message,'失败')
			}
		}).then(()=>{
			this.$router.push({name:'ScriptsAdmin'})
		})
	}
}
</script>

<style lang="stylus">
.electric-script-admin
	padding-top 40px
.relation-checkbox
	transform translateX(-80px)
.add-script-setting *
	font-beautify()
	text-shadow 0 0 1px #ccc
	margin 15px 0
	& button:not(.submit-button)
		width 95%
		border-radius 30px !important
		background-color #8166c7
	& button
		padding 15px !important
		font-size 1em
		box-shadow 0 2px 30px #beaae0
		transition .3s
		span
			color #fefefe
			text-shadow 0 0 2px #fff
		&:hover
			transform translateY(-1px) scale(1.02)
			box-shadow 0 2px 10px #beaae0
		&.is-disabled:not(.submit-button)
			background-color #b4a6d7
			&:hover
				opacity 0.7
				background-color #b4a6d7
</style>
