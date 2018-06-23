<template lang="pug">
el-row#bottom(:span=24)
	el-carousel.carousel(:interval="4000" type="card" height="300px")
		el-carousel-item.carousel-item(v-for="i in 4" :key="i")
			img(:src="i|getImg")
	el-row.title(tag="h1" class="aTitle") {{titleText}}
	el-row.content(tag="h3" class="aTitle" v-html="info")
	sub-button.aTitle(:btn-text="btnText")
	el-row.footer(tag="footer" class="aTitle") {{footerText}}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import SubButton from '~/element/SubButton'
@Component({
	components: {
		SubButton
	},
	filters: {
		getImg: function(i) {
			return require(`img/screen${i++}.png`)
		}
	}
})
export default class Bottom extends Vue {
	titleText = '让我们开始吧！'
	info = '<p>我们做智能家居的初衷就是全民普及全屋无线智能家居，让所有人都用得起、用得上。</p><br/><p>我们理解的“智能家居”，不是捧上天的“智能”，而是切实带给人的“方便”。</p><br/><p>我们不做噱头，不做“高大上”，不一味追求“颜值”，要知道：“羊毛出在羊身上”。</p><br/><p>但我们对产品性价比和稳定性的追求从未停止！</p>'
	btnText = '加入我们'
	footerText = 'Copyright © 2017.物联时代 All rights reserved.'
}
</script>

<style lang="stylus">

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
		for $item in 1..5
			&:nth-child({$item})
				opacity 0
				transform translateY(400px)
				animation-delay $item*0.2s !important
				animation toShow 1s ease-out forwards
	.content
		margin 8vh 10vw
	.footer
		position fixed
		bottom 10px
		width 40vw
		left 30%
		margin 0

@keyframes toShow
	to
		opacity 1
		transform translate(0px)

.carousel
	position fixed !important
	width 100%
	opacity 0
	transform scale(0.3)
	animation toBig 0.7s ease-out forwards

@keyframes toBig
	to
		opacity 1
		transform scale(1)

.el-carousel__item
	box-shadow  0 0 20px #ccc
	opacity .5
.el-carousel__item:nth-child(2n)
	background-color #99a9bf
.el-carousel__item:nth-child(2n+1)
	background-color #d3dce6

</style>
