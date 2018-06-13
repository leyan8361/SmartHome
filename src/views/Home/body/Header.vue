<template lang="pug">
el-row(type="flex" justify="center" align="middle")
	el-col.header-title(:span="24" align="middle" tag="h1" v-once) {{title}}
	//- PC端
	el-col.hidden-sm-and-down(:span="3" :push="21" id="form")
		el-button#login(round @click="changeShowStatus({name:'Login',status:true})") {{loginText}}
		el-button#register(round @click="changeShowStatus({name:'Registry',status:true})") {{registryText}}
	//- 移动端
	el-col.hidden-sm-and-up(:span="1" :pull="1")
		el-dropdown.menu(trigger="click" type="flex" justify="center" align="middle")
			span.el-dropdown-link
				i.fa(class="fa-bars")
			el-dropdown-menu(slot="dropdown")
				el-dropdown-item: el-button#login(type="text" @click="changeShowStatus({name:'Login',status:true})") {{loginText}}
				el-dropdown-item: el-button#register(type="text" @click="changeShowStatus({name:'Registry',status:true})") {{registryText}}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { mapMutations } from 'vuex'

@Component({
	methods: {
		...mapMutations('dialog', ['changeShowStatus'])
	}
})
export default class Header extends Vue {
	title = '智能家居管理系统'
	loginText = '登录'
	registryText = '注册'
}
</script>

<style lang="stylus">

.header
	width 100vw
	min-width 100vw
	box-shadow 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)
	position fixed
	background-image bg-header
	font-family font-custom
	letter-spacing 4px
	.white
		background-image #fff
	@media screen and (max-width:768px)
		padding 1vh
	.header-title
		margin 1vh
		font-weight 400
		color #f4f5f9
		text-shadow -1px -1px 1px #99bcc0, 2px 2px 1px #34677d
		@media screen and (max-width:768px)
			font-size 150%

	#form
		position absolute
		button
			box-shadow 0 2px 1px 0 rgba(0, 0, 0, .18)
			letter-spacing 2px
			font-family font-content
			font-size 16px
			color #676767
			transition .3s
			background-color #ecf0f5
			border-color #f1f1f1
			text-shadow #d0c7c5 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px
			&:hover
				transform translateY(-1px)
				box-shadow 0 2px 8px 0 rgba(0, 0, 0, .3)
				border-radius 5%
		#register
			color #fefefe
			border-color #25b864
			background-color #25b864
	.menu
		padding-top 0.5vh
		width 30px
		height 30px
		background-color #ecf0f5
		box-shadow 0 2px 5px 0 rgba(0, 0, 0, .16)
		.fa
			color #666
			user-select none !important

</style>
