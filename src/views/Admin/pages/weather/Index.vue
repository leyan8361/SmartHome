<template lang="pug">
.weather-more-info
	weather-icon.weather-icon(:weather="now.weather" :code="now.code")
	| test
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'
import filterWeatherInfo from '@/utils/weather'
import WeatherIcon from '~/weather/WeatherIcon'

@Component({
	components:{
		WeatherIcon
	},
	computed: {
		...mapState('weather', ['now','forecast','lifeStyle','sun'])
	}
})
export default class WeatherInfo extends Vue{
	created(){
		Object.assign(this.now,filterWeatherInfo(this.now))

		this.forecast.forEach((e,i)=>{
			this.forecast.splice(i,1,filterWeatherInfo(e))
		})

		this.sun.up = this.sun.sr
		this.sun.down = this.sun.ss

		this.lifeStyle = filterWeatherInfo(this.lifeStyle)
	}

}
</script>

<style lang="stylus">
.weather-more-info
	font-beautify()
// .weather-icon

</style>
