<template lang="pug">
el-aside.aside-admin(width="250px")
	.toggle-menu(@click="isCollapse=!isCollapse")
		icon-svg(name="shouqicaidan" size="1.8")
	.logo
		.logo-icon: icon-svg(name="lightbulb" size="2")
		.logo-text: span Smart Home
	el-menu.menu(:default-openeds="['1','2']" :collapse="!isCollapse"
			background-color="#2D343A" text-color="#b8c7ce" active-text-color="#fff")
		.user-menu
			.avatar-menu: img.avatar(:src="avatar" alt="avatar")
			.user-tip
				|Welcome,
				.name-menu: span(v-text="name")
		el-submenu(index="1")
			template(slot="title")
				i.el-icon-star-off
				span(slot="title") 我的电器
			router-link(:to="{name:'ElectricView'}" tag="li"  v-waves)
				el-menu-item(index="1-1") 设置电器
			router-link(:to="{name:'ElectricAdmin'}" tag="li"  v-waves)
				el-menu-item(index="1-2") 管理电器
			router-link(:to="{name:'UserElectrics'}" tag="li"  v-waves)
				el-menu-item(index="1-3") 查看电器
		el-submenu(index="2")
			template(slot="title")
				i.el-icon-setting
				span(slot="title") 我的指令
			router-link(:to="{name:'ScriptsAdd'}" tag="li"  v-waves)
				el-menu-item(index="1-4") 添加指令
			router-link(:to="{name:'ScriptsAdmin'}" tag="li"  v-waves)
				el-menu-item(index="1-5") 管理指令
		el-submenu(index="3")
			template(slot="title")
				i.el-icon-menu
				span(slot="title") 我的家人
			router-link(:to="{name:'FamilySearch'}" tag="li"  v-waves)
				el-menu-item(index="3-1") 邀请家人
			el-menu-item(index="3-2") 加入家庭
			router-link(:to="{name:'UserFamily'}" tag="li"  v-waves)
				el-menu-item(index="3-3") 查看成员
		el-submenu(index="4")
			template(slot="title")
				i.el-icon-news
				span(slot="title") 我的信息
			router-link(:to="{name:'NoticeFamily'}" tag="li" v-waves)
				el-menu-item(index="4-1") 我的主页
			router-link(:to="{name:'WeatherInfo'}" tag="li"  v-waves)
				el-menu-item(index="4-2") 修改信息
		el-submenu(index="5")
			template(slot="title")
				i.el-icon-bell
				span(slot="title") 我的通知
			router-link(:to="{name:'NoticeFamily'}" tag="li" v-waves)
				el-menu-item(index="5-1") 家庭邀请
			el-menu-item(index="5-2") 电器日志
			router-link(:to="{name:'WeatherInfo'}" tag="li"  v-waves)
				el-menu-item(index="5-3") 天气情况
			el-menu-item(index="5-4") 使用功耗
	.menu-footer
		router-link(:to="{name:'ScriptsAdmin'}" tag="a" v-waves)
			el-tooltip(content="设置" placement="top" )
				icon-svg(name="shezhi" size="2.1")
		el-tooltip(content="分享" placement="top" )
			icon-svg(name="fenxiang1" size="2.1")
		el-tooltip(content="退出" placement="top" @click.native="dropOut")
			icon-svg(name="logout" size="2.1")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'
import status from '@/utils/global/status'


@Component({
	computed:{
		...mapState('user',['account','name','address','avatar'])
	}
})
export default class Aside extends Vue{
	isCollapse = true
	dropOut(){
		status.logOut({hasTip:false,isShowLogin:false})
	}
}
</script>

<style lang="stylus">
.aside-admin
	box-shadow 2px 0 6px rgba(0,21,41,.35)
	z-index 999
	overflow hidden !important
menu-width = 250px
menu-height = 60px
.logo
	height menu-height
	width menu-width
	background-color #303a3f
	padding-top 10px
	color #fff
	position fixed
	z-index 99
	box-shadow 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)
	.svg-icon
		border-radius 15%
		padding 2px
		box-shadow 2px 3px 4px 1px rgba(28, 73, 44, 0.7)
		transform rotate(340deg)
.logo-icon
	margin-left 50px

.logo-text
	font-size 90%
	position relative
	left 85px
	bottom 20px
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
	span
		text-shadow 3px 3px 2px #0f4743
.toggle-menu
	position fixed
	top 13px
	left 270px
	color #999
	cursor pointer
	width 50px
	height 50px
	z-index 999
	.svg-icon
		transition .2s
		padding 2px
		box-shadow inset 2px 0px 6px 1px rgba(26,65,65,0.7)
		&:hover
			transform translateX(-2px)
.menu
	margin-top 100px
	min-height 100vh
	letter-spacing 2px
	overflow hidden
.menu-footer
	position fixed
	bottom 0
	background-color #272f32
	height menu-height - 10px
	width menu-width - 1px
	text-align center
	padding-top 8px
	box-shadow 0px -5px 5px 0 rgba(59,58,60,0.16), -1px -9px 12px 0px rgba(0,0,0,0.12)
	.svg-icon
		color #fff
		font-weight bold
		margin 0px 15px
		padding 10px
		border-radius 15%
		box-shadow inset 2px 0px 6px 1px rgba(174, 178, 178, 0.7)
.user-menu
	padding 8px
	margin-top 75px
	padding-bottom 5px
	border-bottom dashed 0.5px #999
	font-family "Comic Sans MS", "Helvetica Neue", "Microsoft Yahei", -apple-system, sans-serif
	.avatar
		padding 1px
		transform scale(1.8)
		position relative
		left 25px
		bottom -10px
		border-radius 50%
		box-shadow 0 0 2px 3px rgba(255,255,255,0.7), 0 0 20px 2px #f6f6f6
		transition .3s
		background-color #fff
		&:hover
			transform scale(2.0)
	.name-menu
		margin-top 5px
		color #fff
		font-weight bold
		font-size 120%
	.user-tip
		font-size 70%
		color #ccc
		position relative
		left 85px
		bottom 20px
</style>
