<template lang="pug">
el-container
	el-aside.aside(width="50%")
		el-row.description.aTitle(tag="h2" :class="{show:isShow}" v-for="item in infos" :key="item") {{item}}
		sub-button.aTitle(:class="{show:isShow}" :btn-text="btnText")
	el-main.sub-main(class="hidden-sm-and-down")
		img.fade-custom-even(:src="img" :class="{show:isShow}")
	icon-arrow
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import IconArrow from '~/icons/IconArrow'
import SubButton from '~/element/SubButton'

@Component({
	components: {
		IconArrow,
		SubButton
	}
})
export default class MainTop extends Vue {
	infos = ['开启全新的生活方式', '物联时代', '用设备管理设备', '让电器不再简单']
	btnText = '了解更多'
	img = require('img/device.png')
	isShow = false
	hProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : 'null'
	created() {
		window.addEventListener(
			this.hProperty.replace(/hidden/i, 'visibilitychange'),
			this.show
		)
		this.show()
	}
	show() {
		if (!document[this.hProperty] && !this.isShow) {
			this.isShow = true
		}
	}
}
</script>

<style lang="stylus" scoped>
.aside
	position fixed
	bottom 8vh
	@media screen and (max-width:768px)
		width 100%
		min-width 100%
		.description
			font-size 150%
	.description
		margin 0vh auto 7vh
		font-size 200%

.sub-main
	position fixed
	padding 0
	bottom 0
	left 50%
	width 50vw
	margin-bottom -1vh
	overflow hidden


.aTitle
	for $item in 1..5
		&:nth-child({$item})
			opacity 0
			transform translateX(-500px)
			&.show
				animation-delay $item*0.2s !important
				animation fade-enter 1s ease-in-out forwards
			@media screen and (max-width:768px)
				transform translateY(800px)

@keyframes fade-enter
	to
		opacity 1
		transform translate(0px)
.fade-custom-even
	opacity 0
	transform translateY(500px)
	&.show
		animation fade-enter 1s 1.6s forwards
</style>
