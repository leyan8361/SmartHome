<template lang="pug">
.user-main
	el-breadcrumb.breadcrumb(separator="/")
		el-breadcrumb-item.home-link(:to="{name:'Home'}") 首页
		el-breadcrumb-item {{title}}
	el-row#card-title(:span="24" tag="span" type="flex" align="middle" justify="center") {{ title }}
	close-icon
	transition(:name="animation")
		router-view(:key="Date.now()")
</template>

<script>
import {Vue,Component,Watch} from 'vue-property-decorator'
import {getRandomAnimation} from '@/utils/ui/animation'
import CloseIcon from '~/icons/CloseIcon'

@Component({
	components:{
		CloseIcon
	},
	watch:{
		'$route'(to,from){
			this.changeAnimation()
		}
	}
})
export default class Card extends Vue{
	title = '标题党'
	animation = getRandomAnimation()
	changeAnimation(){
		this.animation = getRandomAnimation()
	}
	created(){
		this.title = this.$route.meta.title
	}
}
</script>

<style lang="stylus">
.user-main
	margin 80px
	height 80vh
	min-heiht 80vh
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
	#card-title
		font-beautify()
		letter-spacing 8px
		font-size 200%
		border-bottom dotted 3px #cc
.breadcrumb
	position absolute
	cursor pointer
	z-index 666
	padding 10px
	color #666
	text-shadow 0 0 1px #ccc
	letter-spacing 1px
	// .home-link:hover
</style>
