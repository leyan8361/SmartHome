<template lang="pug">
.user-info
	el-row.user-avatar(:span="24" type="flex" align="middle" justify="center")
		img(:src="avatar")
	el-row.user-name(v-text="`昵称：${name}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-account(v-text="`账号：${account}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-address(v-text="`地址：${getAddress}`" :span="24" tag="span" type="flex" align="middle" justify="center")
	el-row.user-family(:span="24" type="flex" align="middle" justify="center")
		| 家庭关系
	el-row.user-electric(:span="24" type="flex" align="middle" justify="center")
		| 电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'
@Component({
	computed:{
		...mapState('user',['name','account','address','avatar'])
	}
})
export default class User extends Vue{
	get getAddress(){
		const address = Object.values(this.address)
		let result = ''
		address.forEach(e=>{
			if(e){
				result += e
			}
		})
		return result
	}
}
</script>

<style lang="stylus">
@import '../../../../assets/css/func'
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
.user-family,.user-electric
	border-top dotted 1px #ccc
	padding-top 20px
	font-beautify()
</style>
