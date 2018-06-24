<template lang="pug">
.user-feedback-component
	el-form.feedback-form(:model="feedback" label-width="100px"  center status-ico)
		el-form-item(label="等级评分")
			el-rate.feedback-rate(v-model="feedback.rate" show-text)
		el-form-item(label="宝贵意见")
			el-input.feedback-input(type="textarea" v-model.trim="feedback.evaluation")
	el-row(:span="24" type="flex" align="middle" justify="center")
		el-button.submit-button(type="success" @click="submitForm" ) 马上反馈
	.feedback-tip(:span="24" type="flex" align="middle" justify="center")
		el-row
			textra(:data="words" :timer="1.5" :sequence="true" :infinite="true")
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
		...mapActions('user',['addFeedback'])
	}
})
export default class UserFeedback extends Vue{
	words=['非常感谢您对我们的提出宝贵的意见','我们将在 1-3 个工作日内，给您反馈']
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
.user-feedback-component
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
		& *
			padding 5px 0
</style>
