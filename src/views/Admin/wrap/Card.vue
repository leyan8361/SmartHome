<template lang="pug">
.user-main
	el-row#card-title(:span="24" tag="span" type="flex" align="middle" justify="center") {{ title }}
	close-icon
	transition( name="rotateDownLeft" )
		router-view
</template>

<script>
import CloseIcon from '~/CloseIcon.vue'
import {Vue,Component,Watch} from 'vue-property-decorator'
@Component({
	components:{
		CloseIcon
	},
	watch:{
		'$route'(to,from){
			this.title = this.$route.meta.title
		}
	}
})
export default class Template extends Vue{
	title = '标题党'
	created(){
		this.title = this.$route.meta.title
	}
}
</script>

<style lang="stylus">
@import '../../../assets/css/func'
.user-mai
	margin 80p
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
		border-bottom dotted 3px #ccc
</style>
