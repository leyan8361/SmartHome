<template lang="pug">
	.weather-info(:span="24" type="flex" align="middle" justify="center")
		weather-icon.weather-icon(:weather="now.weather" :code="now.code")
		el-row.weather-base-info
			.weather-weather
				| {{now.weather}}
			.weather-temperature
				| {{now.temperature+'℃'}}
		router-link.more-info-weather-link(:to="{name:'WeatherInfo'}" v-waves)
			| 更多信息
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'
import WeatherIcon from '~/weather/WeatherIcon'
import filterWeatherInfo from '@/utils/weather'

@Component({
	components:{
		WeatherIcon
	},
	computed: {
		...mapState('weather', ['now'])
	}
})
export default class WeatherInfo extends Vue{
	created(){
		Object.assign(this,filterWeatherInfo(this.now))
	}
}
</script>

<style lang="stylus">
.weather-info
	font-beautify()
	position absolute
	top 15%
	left 20%
	height 250px
	width 300px
	box-shadow 2px 3px 10px #ccc
	border-radius 10px
	padding 50px 100px
	.weather-icon
		position absolute
		top 25%
		left 50%
	.weather-base-info
		margin-top 70px
		z-index 999
		opacity .8
		& *
			padding 8px 10px
	.more-info-weather-link
		display block
		text-decoration none
		font-size .7em
		margin-top 5px
		color #fff
		background-color #333
		padding 8px
		border-radius 5px
		box-shadow 1px 1px 10px #999
		border solid 2px #999
		transition all .3s
		&:active
			box-shadow: 0 0 0px gray;
			transform scale(0.8) translateY(5)
		&:hover
			border solid 2px #000
			color #000
			background-color #fff
</style>
