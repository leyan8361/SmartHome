<template lang="pug">
.user-main
	el-row.user-title(:span="24" tag="span" type="flex" align="middle" justify="center") {{title}}
	close-icon(@click.native="drop")
	transition( name="rotateDownLeft" )
		router-view
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import CloseIcon from '@/components/CloseIcon.vue'
@Component({
	components:{
		CloseIcon
	},
	watch: {
  '$route' (to, from) {
		this.filterTitle()
  }
}

})
export default class Template extends Vue{
	title='标题党~'
	isDrop = false
	created(){
		this.filterTitle()
	}
	filterTitle(){
		switch(this.$router.currentRoute.name){
			case 'UserProfile': this.title = '个人主页'
				break
			case 'UserModify': this.title = '修改信息'
				break
			case 'FamilyInvite': this.title = '邀请家人'
				break
			case 'FamilySearch': this.title = '搜索家人'
				break
			case 'NoticeFamily': this.title = '家庭消息'
				break
			case 'NoticeElectric': this.title = '设备消息'
				break
			default: this.title='标题党~'
				break
		}
	}
	drop(){
		this.isDrop = true
		this.$router.push({path:'home',name:'Home'})
	}
}
</script>

<style lang="stylus">
@import '../../../assets/css/func'
.user-main
	margin 80px
	height 80vh
	min-height 80vh
	width 50vw
	overflow hidden
	left 27%
	padding 30px
	box-shadow 0 10px 25px rgba(56,56,56,0.2)
	border 1px solid #eee
	background-color #f6f6f6
	border-radius 1em
	position fixed
	z-index 10
	cursor default
	.user-title
		font-beautify()
		letter-spacing 8px
		font-size 200%
		border-bottom dotted 1px #ccc
</style>
