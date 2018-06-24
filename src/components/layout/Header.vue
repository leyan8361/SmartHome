<template lang="pug">
	el-header.admin-header
		el-row(:span="24" type="flex" align="middle")
			el-col.announcement(:span="12" :push="1")
				icon-svg(name="tongzhi" size="1.5")
				.tip-label 小贴士
				textra.tip-word(:data="words" :timer="1.5" :sequence="true" :infinite="true")
			el-col.notice(:span="10" :push="3")
				router-link(:to="{name:'NoticeFamily'}")
					el-col.family(:span="2")
						el-tooltip(:content="`${news.family?'您收到新的家庭消息了':'家庭消息'}`" placement="bottom")
							el-badge(:value="news.family" :max="10" :hidden="news.family===0")
								icon-svg.notice-icon(name="jiatingfang" size="1.2")
				router-link(:to="{name:'NoticeUsagelog'}")
					el-col.electric(:span="2")
						el-tooltip(:content="`${news.electric?'电器状态有更新了！':'电器消息'}`" placement="bottom" )
							el-badge(:value="news.electric" :max="10" :hidden="news.electric===0")
								icon-svg.notice-icon(name="icon" size="1.2")
				router-link(:to="{name:'WeatherIndex'}")
					el-col.weather(:span="2")
						el-tooltip(:content="`${localDate!=currDate?'今天的天气信息更新了！':'天气信息'}`" placement="bottom")
							el-badge(:is-dot="localDate!=currDate")
								icon-svg.notice-icon(name="shouye" size="1.2")
			el-col.person(:span="2" :push="2")
				.user
					.avatar-wrap: img.avatar(:src="avatar" alt="avatar")
					el-dropdown
						span.user-right-name(class="name" v-text="name")
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
								router-link(:to="{name:'UserFeedback'}" tag="li")
									icon-svg(name="icon20101" size="1.2")
									|意见反馈
							el-dropdown-item(@click.native="dropOut")
								icon-svg(name="logout" size="1.2")
								|退出系统
			.setting
				el-popover(placement="bottom" width="250" trigger="click")
					social-sharing
					el-button(type="text" slot="reference")
						icon-svg.notice-icon(name="fenxiang1" size="1.5")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState,mapMutations,mapActions} from 'vuex'
import status from '@/utils/global/status'
import SocialSharing from '~/element/SocialSharing'

@Component({
	computed:{
		...mapState('user',['account','name','address','avatar','news']),
		...mapState('notice',['family']),
		...mapState('usagelog',['usagelogs'])
	},
	components:{
		SocialSharing
	}
})
export default class LayoutHeader extends Vue{
	words = ['设置自动调节模式，可根据您的生活习惯以及天气情况准确掌握开灯时间','为了您的方便，我们提供了一键离家功能~','可以按照下班时间，准时开灯哦','一键关闭家中所有电器，让生活更安心','控制电器的前提是 电器已连接家中局域网哦~','如果想单独控制电器，电器的 id 号 需与已有电器的 id 号互不相同哦~']
	currDate = new Date().getDate()
	localDate = localStorage.localDate
	created(){
		/* eslint-disable eqeqeq */
		if(!this.localDate || this.currDate != this.localDate){
			localStorage.localDate = this.currDate
		}
	}
	dropOut(){
		status.logOut({hasTip:false,isShowLogin:false})
	}

}
</script>

<style lang="stylus">

.admin-header
	width 100vw
	min-width 100vw
	box-shadow 0 1px 4px rgba(0,21,41,.08)
	position fixed
	border-bottom 1px solid #e6e6e6
	background #fff
	padding-top 8px !important
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
	position absolute
	left 45px
	bottom 19px
	font-size 85%
	letter-spacing 2px
	color #333
	font-weight 300
	text-shadow rgb(69, 45, 45) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
.user
	position fixed
	background-color #ccc
	padding 14px
	top -1px
	right 30px
	cursor pointer
	box-shadow 1px -1px 19px 0px #ccc
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
.announcement
	margin-left -20px
.notice
	margin-left 30px
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
	& li *
		margin 0 6px
.user-right-name
	letter-spacing 2px
</style>
