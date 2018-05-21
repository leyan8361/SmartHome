<template lang="pug">
el-main.main
	transition(v-if="isHome" name="fadeDown")
		.home-main
			icon-sunny
			icon-rainy
			icon-cloudy
			icon-flurries
			icon-storm
			icon-shower
	transition(v-else name="fadeUp")
		router-view
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import IconSunny from '~/weather/Sunny.vue'
import IconRainy from '~/weather/Rainy.vue'
import IconCloudy from '~/weather/Cloudy.vue'
import IconFlurries from '~/weather/Flurries.vue'
import IconStorm from '~/weather/Storm.vue'
import IconShower from '~/weather/Shower.vue'
@Component({
	components:{
		IconSunny,
		IconRainy,
		IconCloudy,
		IconFlurries,
		IconStorm,
		IconShower
	},
	watch:{
		'$router'(to,from){
			this.isHome = this.$router.currentRoute.name === 'Home'
		}
	}
})
export default class Main extends Vue{
	isHome = false
	created(){
		this.isHome = this.$router.currentRoute.name === 'Home'
	}
}
</script>

<style lang="stylus">
.main
	background #f0f2f5
.home-main
	padding 200px
	height 100vh
	width 100vw

</style>
