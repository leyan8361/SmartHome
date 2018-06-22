<template lang="pug">
.feedback-component
	el-form.feedback-form(:model="feedback" label-width="100px"  center status-ico)
		el-form-item(label="等级评分")
			el-rate.feedback-rate(v-model="feedback.rate" show-text)
		el-form-item(label="宝贵意见")
			el-input.feedback-input(type="textarea" v-model.trim="feedback.evaluation")
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button.submit-button(type="success" @click="submitForm" ) 马上反馈
	.feedback-tip(:span="24" type="flex" align="middle" justify="center")
		el-row
			| 非常感谢您对我们的提出宝贵的意见
		el-row
			| 我们将在 1-3 个工作日内，给您反馈
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import notice from '@/utils/ui/notice'
import {mapActions,mapState} from 'vuex'

@Component({
	computed:{
		...mapState('user',['name'])
	},
	methods:{
		...mapActions('feedback',['addFeedback'])
	}
})
export default class Feedback extends Vue{
	feedback = {
		rate:null,
		evaluation:null
	}
	submitForm(){
		if(!this.feedback.rate && !this.feedback.evaluation){
			notice.warning('您还没有提供意见哦~','错误')
		}
		this.feedback.name = this.name
		this.addFeedback(this.feedback).then(e=>{
			notice.success(e.message,'成功')
		})
	}
}
</script>

<style lang="stylus">
.feedback-component
	margin-top 20px
	.feedback-form
		width 400px
		margin 120px 160px 40px
		.feedback-input
			// width 70%
		.feedback-rate
			transform translateY(10px)
	.feedback-tip
		position fixed
		bottom 50px
		left 47%
		font-beautify()
		font-size .9em
		padding 10px
		border-top dashed 1px #ccc
		& *
			padding 5px 0
</style>
