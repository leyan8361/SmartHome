<template lang="pug">
el-main.main
	transition(v-if="isHome" :name="animation")
		.home-main
			weather-card
			electric-card
			consumption-card
			usagelog-chart
			audio-recorder
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
import ConsumptionCard from '~/consumption/Card'
import AudioRecorder from '~/audio/Recorder'

@Component({
	components:{
		WeatherCard,
		ElectricCard,
		UsagelogChart,
		ConsumptionCard,
		AudioRecorder
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
	callback (msg) {
		console.debug('Event: ', msg)
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
