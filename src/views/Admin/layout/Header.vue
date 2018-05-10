<template lang="pug">
	el-header.admin-header
		el-row(:span="24" type="flex" align="middle")
			el-col.announcement(:span="6" :push="1")
				icon-svg(name="tongzhi" size="1.5")
				span.tip-word(v-text="tipWord")
				.tip-label 小贴士
			el-col.notice(:span="10" :push="9")
				router-link(:to="{name:'NoticeFamily'}")
					el-col.family(:span="2")
						el-tooltip(content="家庭最近有更新了！" placement="bottom")
							el-badge(:value="news.family" :max="10")
								icon-svg.notice-icon(name="jiatingfang" size="1.2")
				router-link(:to="{name:'NoticeElectric'}")
					el-col.electric(:span="2")
						el-tooltip(content="设备状态有更新了！" placement="bottom" )
							el-badge(:value="test" :max="10")
								icon-svg.notice-icon(name="icon" size="1.2")
				el-col.weather(:span="2")
					el-tooltip(content="天气信息有更新！" placement="bottom")
						el-badge(is-dot)
							icon-svg.notice-icon(name="shouye" size="1.2")
			el-col.person(:span="2" :push="2")
				.user
					.avatar-wrap: img.avatar(:src="avatar" alt="avatar")
					el-dropdown
						span.el-dropdown-link(class="name" v-text="name")
						el-dropdown-menu.dropmenu(slot="dropdown")
							el-dropdown-item
								router-link(:to="{name:'UserProfile'}" tag="li")
									icon-svg(name="geren" size="1.2")
									|个人主页
							el-dropdown-item
								router-link(:to="{name:'UserModify'}" tag="li")
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
import status from '@/utils/global/status'
@Component({
	methods:{
	},
	computed:{
		...mapState('user',['account','name','address','avatar','news']),
		...mapState('notice',['family'])
	}
})
export default class Header extends Vue{
	test=5
	words = ['天热多加衣服,高级设置可一键离家哦~','高级设置可一键离家哦~','置可一键离家asdsad']
	tipWord = ''
	i=0
	mounted(){
		console.log(this.news)
		setInterval(()=>{
			if(this.i === this.words.length){
				this.i=0
			}
			this.tipWord = this.words[this.i++]
		},5000)
	}
	dropOut(){
		status.logOut({hasTip:false,isShowLogin:false})
	}
}
</script>

<style lang="stylus">
@import '../../../assets/css/variables'

.admin-header
	width 100vw
	min-width 100vw
	box-shadow 0 1px 4px rgba(0,21,41,.08)
	position fixed
	border-bottom 1px solid #e6e6e6
	background #fff
	padding-top 8px
	margin-left -20px
.tongzhi
	color #000
.tip-label
	font-size 20%
	letter-spacing 2px
	margin-left -5px
	margin-top 3px
	color #999
.tip-word
	font-size 85%
	margin-left 12px
	position relative
	bottom 4px
	letter-spacing 2px
	color #333
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
	background-color #ccc
	padding 14px
	top -1px
	right 30px
	cursor pointer
	box-shadow 1px -1px 19px 0px #ccc
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif

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
		box-shadow inset 2px 2px 4px 1px rgba(228, 229, 230, 0.7)
		padding 5px
		border-radius 15%
		transform scale(1.8)
.announcement
	margin-left 20px
.name
	font-weight bold
	color #fff
	position relative
	bottom 8px
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
	color #666
.notice-icon
	color #333
.dropmenu
	width 10%
	text-align center
	text-shadow 0 0 1px #ccc
	.svg-icon
		margin-right 20px
</style>
