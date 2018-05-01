<template lang="pug">
el-row#bottom(:span=24)
	el-row.title(tag="h1" class="aTitle") {{titleText}}
	el-row.content(tag="h3" class="aTitle") {{info}}
	sub-button.aTitle(:btn-text="btnText")
	el-row.footer(tag="footer" class="aTitle") {{footerText}}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import SubButton from '~/SubButton.vue'
@Component({
	components: {
		SubButton
	}
})
export default class Bottom extends Vue {
	titleText = '让我们开始吧'
	info = '你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？你还在等什么？'
	btnText = '加入我们'
	footerText = 'Copyright © 2017.物联时代 All rights reserved.'
}
</script>

<style lang="stylus">
@import '../../../assets/css/animation'

#bottom
	height 100vh
	min-height 100vh
	width 100vw
	min-width 100vw
	overflow hidden
	padding 3vw
	.title
		font-size 200%
	.sub-button
		font-size 110%
		background-color transparent
		border solid 3px #333
		letter-spacing 2px
		transition .3s
		color #333
		&:hover
			border-color #f1f1f1
			color #fff
			background-color #333

	.aTitle
		margin 8vh auto
		for $item in 1..4
			&:nth-child({$item})
				opacity 0
				transform translateY(400px)
				animation-delay $item*0.2s !important
				animation toShow 1s ease-out forwards
	.content
		margin 8vh 10vw
	.footer
		position fixed
		bottom 0
		width 40vw
		left 30%
		margin 0

@keyframes toShow
	to
		opacity 1
		transform translate(0px)
</style>
