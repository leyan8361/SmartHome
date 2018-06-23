<template lang="pug">
el-main.main
	transition(v-if="isHome" :name="animation")
		.home-main
			weather-card
			electric-card
			usagelog-chart
	transition(v-else :name="animation")
		router-view(:key="Date.now()")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'
import {getRandomAnimation} from '@/utils/ui/animation'
import WeatherCard from '~/weather/Card'
import ElectricCard from '~/electric/Card'
import UsagelogChart from '~/usagelog/Chart'

@Component({
	components:{
		WeatherCard,
		ElectricCard,
		UsagelogChart
	},
	computed:{
		...mapState('ui',['isHome'])
	},
	watch:{
		'$route'(to,from){
			this.changeAnimation()
		}
	}
})
export default class LayoutMain extends Vue{
	animation = getRandomAnimation()
	changeAnimation(){
		this.animation = getRandomAnimation()
	}
}
</script>

<style lang="stylus">
.main
	background #f6f6f6
	overflow hidden !important
.home-main
	height 100vh
	max-height 100vh
	width 100vw

</style>
