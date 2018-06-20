<template lang="pug">
.user-info
	el-row.user-avatar(:span="24" type="flex" align="middle" justify="center")
		img(:src="avatar")
	el-row.user-name(v-text="`昵称：${name}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-account(v-text="`账号：${account}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-address(v-text="`地址：${getAddress}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-family(:span="24" type="flex" align="middle" justify="center")
		router-link(:to="{name:'UserFamily'}" tag="a")
			| 家庭关系
	el-row.user-electric(:span="24" type="flex" align="middle" justify="center")
		router-link(:to="{name:'UserElectrics'}" tag="a")
			| 电器信息
	el-row.user-usagelog(:span="24" type="flex" align="middle" justify="center")
		router-link(:to="{name:'UserUsagelog'}" tag="a")
			| 使用日志
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'
@Component({
	computed:{
		...mapState('user',['name','account','address','avatar']),
		...mapState('electrics',['bulbs'])

	}
})
export default class User extends Vue{
	get getAddress(){
		return Object.values(this.address).join()
	}
}
</script>

<style lang="stylus">
.user-avatar img
	height 120px
	width 120px
	border-radius 50%
	box-shadow 0px 1px 20px 3px rgba(210, 201, 201, 0.7), 0 0 20px 2px #f6f6f6
	transition .3s
.user-info *
	padding 10px
	font-beautify()
	border-radius 2%
	&:not(:first-child):hover
		box-shadow rgba(0, 0, 0, 0.2) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 1px 4px
		transform translateY(-1px)
		transition .2s
	&:first-child
		&:hover
			transition .2s
			transform scale(1.05)
.user-family
	margin-top 20px
.user-family,.user-electric,.user-usagelog
	padding-top 20px
	font-beautify()
	border dashed 1px #ccc
	& a
		color transparent
		text-shadow 0 0 1px #000
		border-bottom 0px solid #ccc
		transition .5s
		border-radius 3px
		background-color #fefefe
		&:hover
			border-bottom-width 5px
			opacity .8
			color #000
			background-color #fff
			text-shadow 0 0 10px #666
			transform translateY(-2px)
			letter-spacing 5px
</style>
