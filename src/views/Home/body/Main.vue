<template lang="pug">
#main(:style="{backgroundImage:bgs[activeItem-1]}")
	home-nav(:active-item="activeItem" :max-item="maxItem" @changeActive="goTo")
	- const layout={ type:'flex', justify:'center', align:'middle',class:"sub-container"}
	main-top(v-if="activeItem===1")&attributes(layout)
	main-middle(v-else-if="activeItem===2")&attributes(layout)
	main-bottom(v-else-if="activeItem===3")&attributes(layout)
	login-dialog
	registry-dialog
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Global from '@/utils/global'
import HomeNav from './Nav.vue'
import MainTop from '../pages/Top.vue'
import MainMiddle from '../pages/Middle.vue'
import MainBottom from '../pages/Bottom.vue'
import LoginDialog from '../form/LoginDialog.vue'
import RegistryDialog from '../form/RegistryDialog.vue'

@Component({
	components: {
		HomeNav,
		MainTop,
		MainMiddle,
		MainBottom,
		LoginDialog,
		RegistryDialog
	},
})
export default class Main extends Vue {
	activeItem = 1
	maxItem = 3

	bgs = [
		'linear-gradient(180deg, #f5f1f1 30%, rgb(239, 241, 243) 45%, rgb(247, 244, 238) 71%, #efefef 91%)',
		'linear-gradient(180deg, #EBF5F2 0%, #FFEFD4 100%)',
		'linear-gradient(309deg, #C0F3E0 0%, #F5EEE2 100%)'
	]

	Verification(isUp) {
		const limit = isUp ? 1 : this.maxItem
		const step = isUp ? -1 : 1
		if (this.activeItem === limit) {
			return false
		}
		this.activeItem += step
		return true
	}
	created() {
		document.addEventListener('mousewheel', e => {
			if(this.$store.state.dialog.isShowLogin || this.$store.state.dialog.isShowRegistry){
				return
			}
			const isUp = e.deltaY < 0
			if (!this.Verification(isUp)) {
				return
			}
		})
	}
	goTo(target) {
		this.activeItem = target
	}
	preLoad(name = 'iframe', src = '//tomotoes.com/blog') {
		// const _iframe = document.createElement(name)
		// _iframe.style.display = 'none'
		// _iframe.src = src
		// document.body.appendChild(_iframe)
		// return preLoad
	}
}
</script>

<style lang="stylus">
#main
	overflow hidden
	height 100vh
	width 100vw
	min-height 100vh
	min-width 100vw
	padding 0
	margin 0
	transition .4s
	.sub-container
		margin-top 18vh
		transition 0.5s
		@media screen and (max-width:768px)
			margin-top 10vh

</style>
