<template lang="pug">
#error
	span.face :(
	p 您访问的页面没有找到。
		br
		span#mes {{waitSecond}}
		span 秒后转至您刚才浏览的页面，您可以在那里试着找找您所需要的信息。
		br
		span.tips 如果您想了解更多信息，则可以稍后在线搜索此错误: 算了您还是别搜了……
</template>

<script>
import { Vue,Component } from 'vue-property-decorator'
@Component
export default class Error extends Vue {
	waitSecond = 5
	intervalid = setInterval(this.cutdown, 1000)
	cutdown() {
		if (--this.waitSecond === 0) {
			this.$router.go(-1)
			clearInterval(this.intervalid)
		}
	}
	beforeDestroy(){
		clearInterval(this.intervalid)
	}
}
</script>

<style lang="stylus">
#error
	overflow hidden
	height 100vh
	width 100vw
	min-height 100vh
	min-width 100vw
	background-color #0099CC
	color #FFFFFF
	font-family Microsoft Yahei, "Helvetica Neue", Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif
	padding-top 80px
	padding-left 100px
	.face
		font-size 100px
	p
		font-size 24px
		padding 8px
		line-height 40px
    .tips
			font-size 16px

@media screen and (max-width: 600px)
	body
		margin 0 10px
	p
		font-size 18px
		line-height 30px
		.tips
			display inline-block
			padding-top 10px
			font-size 14px
			line-height 20px
</style>
