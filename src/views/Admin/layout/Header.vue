<template lang="pug">
	el-header.admin-header
		el-row(:span="24" type="flex" align="middle")
			el-col.announcement(:span="6" :push="1")
				icon-svg(name="tongzhi" size="1.5")
				span.tip-word(v-text="tipWord")
				.tip-label 小贴士
			el-col.notice(:span="10" :push="10")
				el-col.family(:span="2")
					el-tooltip(content="家庭最近有更新了！" placement="bottom")
						el-badge(value="o")
							icon-svg.notice-icon(name="jiatingfang" size="1.2")
				el-col.weather(:span="2")
					el-tooltip(content="天气信息有更新！" placement="bottom")
						el-badge(is-dot)
							icon-svg.notice-icon(name="shouye" size="1.2")
				el-col.electric(:span="2")
					el-tooltip(content="设备状态有更新了！" placement="bottom" )
						el-badge(:value="notice" :max="10")
							icon-svg.notice-icon(name="icon" size="1.2")
			el-col.person(:span="2" :push="2")
				.user
					.avatar-wrap: img.avatar(:src="avatar" alt="avatar")
					el-dropdown
						span.el-dropdown-link(class="name" v-text="name")
						el-dropdown-menu.dropmenu(slot="dropdown")
							el-dropdown-item
								icon-svg(name="geren" size="1.2")
								|个人主页
							el-dropdown-item
								icon-svg(name="guanlikehu" size="1.2")
								|修改信息
							el-dropdown-item
								icon-svg(name="icon20101" size="1.2")
								|查看帮助
							el-dropdown-item(@click.native="dropOut")
								icon-svg(name="logout" size="1.2")
								|退出系统
			.setting
				el-button(type="text"): icon-svg.notice-icon(name="shezhi2" size="1.5")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapMutations,mapActions} from 'vuex'

@Component({
	methods:{
		...mapMutations('user',['SET_STATUS']),
		...mapMutations('dialog',['changeShowStatus'])
	},
	computed:{
		...mapState('user',['account','name','address','avatar']),
	}
})
export default class Header extends Vue{
	notice=5
	words = ['天热多加衣服,高级设置可一键离家哦~','高级设置可一键离家哦~','置可一键离家asdsad']
	tipWord = ''
	i=0
	mounted(){
		setInterval(()=>{
			if(this.i === this.words.length){
				this.i=0
			}
			this.tipWord = this.words[this.i++]
		},5000)
	}
	dropOut(){
		this.SET_STATUS('UNLOGIN')
		this.changeShowStatus({name:'Login',status:false})
		this.$router.push({name:'Index',path:'/'})
	}
}
</script>

<style lang="stylus">
@import '../../../assets/css/variables'

.admin-header
	width 100vw
	min-width 100vw
	box-shadow 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)
	position fixed
	background-color #3c8dbc
	padding-top 8px
	margin-left -20px
.tongzhi
	color skyblue
.tip-label
	font-size 20%
	letter-spacing 2px
	margin-left -5px
	margin-top 3px
	color #ffffff
.tip-word
	font-size 85%
	margin-left 12px
	position relative
	bottom 4px
	letter-spacing 2px
	color #fff
	font-weight 300
	transition all 0.5s
	text-shadow rgb(69, 45, 45) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
	opacity 0
	bottom 10px
	animation toSkew 2s infinite alternate
@keyframes toSkew
	50%
		opacity 0
		bottom 10px
	100%
		opacity 1
		bottom 4px
.user
	position fixed
	background-color #367fa9
	padding 14px
	top -1px
	right 30px
	cursor pointer
.avatar-wrap
	display inline-block
	border-radius 50%
	border-radius 50%
.avatar
	height 30px
	width 30px
	border-radius 50%
.notice
	cursor pointer
	.svg-icon
		box-shadow inset 2px 2px 4px 1px rgba(94, 159, 205, 0.7)
		padding 5px
		border-radius 15%
		transform scale(1.8)
.name
	font-weight bold
	color #fff
	position relative
	bottom 5px
	margin-left 10px
	&:after
		display: inline-block;
		width: 0
		height: 0
		margin-left: .255em
		vertical-align: .255em
		content: ""
		border-top: .3em solid
		border-right: .3em solid transparent
		border-bottom: 0
		border-left: .3em solid transparent
.setting
	position fixed
	right 2px
	top 10
	color #fff
.notice-icon
	color #fff
	margin-left 15px
.dropmenu
	width 10%
	text-align center
	text-shadow 0 0 1px #ccc
	.svg-icon
		margin-right 20px
</style>
