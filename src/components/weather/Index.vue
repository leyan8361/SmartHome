<template lang="pug">
	.weather-info(:span="24" type="flex" align="middle" justify="center")
		weather-icon(:weather="weather" :code="code")
		el-row.weather-base-info
			.weather-weather
				| {{weather}}
			.weather-temperature
				| {{temperature+'℃'}}
		router-link()
			| 更多信息
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'
import WeatherIcon from '~/weather/WeatherIcon'

@Component({
	components:{
		WeatherIcon
	},
	computed: {
		...mapState('weather', ['now','forecast','lifeStyle','sun'])
	},
	'$route'(to, from) {
		this.Init()
	}
})
export default class WeatherInfo extends Vue{
	weather='晴'
	code=1
	wind={
		direction:'西北', //风向
		power:3, //风力
		speed:15 //风速
	}

	temperature = 30 //温度
	humidity = 40 //相对湿度

	precipitation = 0 //降水量
	seeing = 10 //能见度 单位公里

	created(){
		this.Init()
	}
	Init(){
		Object.assign(this,this.getWeatherInfo(this.now))
		this.forecast.forEach(e=>{
			e = this.getWeatherInfo(e)
		})

		this.sun.up = this.sun.sr
		this.sun.down = this.sun.ss

		// this.lifeStyle 生活指数

	}
	getWeatherInfo(weather){
		const result = {}
		result.weather = weather.cond_txt
		result.code = weather.cond_code

		result.wind.direction = weather.wind_dir
		result.wind.power = weather.wind_sc
		result.wind.speed = weather.wind_spd

		result.humidity = weather.hum
		result.temperature = weather.tmp

		result.precipitation = weather.pcpn
		result.seeing = weather.vis

		return result
	}
}
</script>

<style lang="stylus">
@import '../../assets/css/func'
.weather-info
	font-beautify()
	position absolute
	top 15%
	left 20%
	height 300px
	width 300px
	box-shadow 2px 3px 10px #ccc
	border-radius 10px
	padding 100px
	.weather-base-info
		margin-top 100px
		& *
			padding 10px
</style>
