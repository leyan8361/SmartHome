<template lang="pug">
.weather-more-info
	| test
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
	computed: {
		...mapState('weather', ['now','forecast','lifeStyle','sun'])
	}
})
export default class WeatherInfo extends Vue{
	created(){
		Object.assign(this,filterWeatherInfo(this.now))

		this.forecast.forEach(e=>{
			e = this.getWeatherInfo(e)
		})

		this.sun.up = this.sun.sr
		this.sun.down = this.sun.ss

		// this.lifeStyle 生活指数
	}

}
</script>

<style lang="stylus">

</style>
