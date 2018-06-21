<template lang="pug">
.electric-component(:span="24" type="flex" align="middle" justify="center")
	el-row.electric-setting-title
		| 电器设置
	el-row.electric-settings
		el-row.electric-setting-button(@click.native="bulbs.length===0?$notify({type:'warning',title: '别急',message: '您必须有电器才能添加指令哦',duration:1000}):turnBulbs(false)")
			| 一键关灯
		el-row.electric-setting-button(@click.native="bulbs.length===0?$notify({type:'warning',title: '别急',message: '您必须有电器才能添加指令哦',duration:1000}):turnBulbs(true)")
			| 一键开灯
		el-row.electric-setting-button(@click.native="bulbs.length===0?$notify({type:'warning',title: '别急',message: '您必须有电器才能添加指令哦',duration:1000}):isShowSetting=true")
			| 状态设置
		status-setting(:is-show-setting.sync="isShowSetting")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapActions,mapState} from 'vuex'
import notice from '@/utils/ui/notice'
import StatusSetting from '@/views/Admin/form/StatusSetting'

@Component({
	components:{
		StatusSetting
	},
	methods:{
		...mapActions('electrics',['switchBulbsStatus'])
	},
	computed:{
		...mapState('electrics',['bulbs'])
	}
})
export default class Electric extends Vue{
	isShowSetting = false
	turnBulbs(status){
		this.switchBulbsStatus(status).then(e=>{
			if(e.success){
				notice.success(e.message,'成功')
			}else{
				notice.error(e.message,'失败')
			}
		})
	}
}
</script>

<style lang="stylus">
.electric-component
	font-beautify()
	position fixed
	top 58%
	left 25%
	height 250px
	width 300px
	box-shadow 2px 3px 10px #ccc
	border-radius 10px
	padding 50px 100px
	.electric-setting-title
		font-size 1.5em
		width 200px
		margin-left -40px
		margin-bottom 20px
		margin-top -10px
	.electric-settings
		margin-left -20px
		z-index 999
		opacity .8
		width 150px
		text-align center
	.electric-setting-button
		display block
		text-decoration none
		font-size .7em
		margin-top 5px
		color #fff
		cursor pointer
		background-color #333
		padding 9px
		margin 10px auto
		border-radius 5px
		box-shadow 1px 1px 10px #999
		border solid 2px #999
		transition all .3s
		&:active
			box-shadow: 0 0 0px gray;
			transform scale(0.8) translateY(5)
		&:hover
			border solid 2px #000
			color #000
			background-color #fff
</style>
