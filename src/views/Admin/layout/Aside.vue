<template lang="pug">
el-aside(width="200px")
	.toggle-menu(@click="isCollapse=!isCollapse")
		icon-svg(name="shouqicaidan" size="1.8")
	.logo
		.logo-icon: icon-svg(name="lightbulb" size="2")
		.logo-text: span Smart Home
	el-menu.menu(:default-openeds="['1','3']" :collapse="!isCollapse"
			background-color="#2a3f54" text-color="#b8c7ce" active-text-color="#fff")
		.user-menu
			.avatar-menu: img.avatar(:src="avatar" alt="avatar")
			.user-tip
				|Welcome,
				.name-menu: span(v-text="name")
		el-submenu(index="1")
			template(slot="title")
				i.el-icon-message
				span(slot="title") 设备管理
			el-menu-item-group(title="分组一")
				el-menu-item(index="1-1" v-waves) 选项1
				el-menu-item(index="1-2") 选项2
			el-menu-item-group(title="分组二")
				el-menu-item(index="1-3") 选项3
			el-submenu(index="1-4")
				template(slot="title") 选项4
				el-menu-item(index="1-4-1") 选项4-1
		el-submenu(index="2")
			template(slot="title")
				i.el-icon-menu
				span(slot="title") 家庭管理
			el-menu-item-group
				template(slot="title") 分组一
				el-menu-item(index="2-1") 选项一
				el-menu-item(index="2-2") 选项二
			el-menu-item-group(title="分组2")
				el-menu-item(index="2-3") 选项3
			el-submenu(index="2-4")
				template(slot="title") 选项4
				el-menu-item(index="2-4-1") 选项4-1
		el-submenu(index="3")
			template(slot="title")
				i.el-icon-menu
				span(slot="title") 日程安排
			el-menu-item-group
				template(slot="title") 分组一
				el-menu-item(index="2-1") 选项一
				el-menu-item(index="2-2") 选项二
			el-menu-item-group(title="分组2")
				el-menu-item(index="2-3") 选项3
			el-submenu(index="2-4")
				template(slot="title") 选项4
				el-menu-item(index="2-4-1") 选项4-1
		el-submenu(index="4")
			template(slot="title")
				i.el-icon-menu
				span(slot="title") 高级设置
			el-menu-item-group
				template(slot="title") 分组一
				el-menu-item(index="2-1") 选项一
				el-menu-item(index="2-2") 选项二
			el-menu-item-group(title="分组2")
				el-menu-item(index="2-3") 选项3
			el-submenu(index="2-4")
				template(slot="title") 选项4
				el-menu-item(index="2-4-1") 选项4-1
	.menu-footer
		el-tooltip(content="设置" placement="top" )
			icon-svg(name="shezhi" size="2.1")
		el-tooltip(content="分享" placement="top" )
			icon-svg(name="fenxiang1" size="2.1")
		el-tooltip(content="退出" placement="top" )
			icon-svg(name="logout" size="2.1")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'

@Component({
	computed:{
		...mapState('user',['account','name','address','avatar']),
	}
})
export default class Aside extends Vue{
	isCollapse = true
}
</script>

<style lang="stylus">
menu-width = 200px
menu-height = 60px
.logo
	height menu-height
	width menu-width
	background-color #367fa9
	padding-top 10px
	color #fff
	position fixed
	z-index 999
	box-shadow 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)
	.svg-icon
		border-radius 15%
		padding 2px
		box-shadow 2px 3px 4px 1px rgba(28, 73, 44, 0.7)
.logo-icon
	margin-left 20px

.logo-text
	font-size 90%
	position relative
	left 70px
	bottom 20px
	span
		text-shadow 3px 3px 2px #0f4743
.toggle-menu
	position fixed
	top 13px
	left 210px
	color #fff
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
	overflow hidden
	margin-top menu-height
	box-shadow 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)
.menu-footer
	position fixed
	bottom 0
	background-color #2a3f54
	height menu-height - 10px
	width menu-width - 1px
	text-align center
	padding-top 8px
	box-shadow 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)
	.svg-icon
		color #fff
		font-weight bold
		margin 0px 10px
		padding 10px
		border-radius 15%
		box-shadow inset 2px 0px 6px 1px rgba(174, 178, 178, 0.7)
.user-menu
	padding 8px
	margin-top 10px
	padding-bottom 0
	border-bottom solid 1px #ccc
	.avatar
		padding 1px
		transform scale(1.8)
		position relative
		left 25px
		bottom -10px
		border-radius 50%
		background-color #fff
		box-shadow 0 0 2px 3px rgba(255,255,255,0.7), 0 0 20px 2px #f6f6f6
		transition .3s
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
