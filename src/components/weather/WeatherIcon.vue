<template lang="pug">
component(:is="view")
</template>

<script>
	import { Component, Vue } from 'vue-property-decorator'

	import IconSunny from '~/weather/icons/Sunny'
	import IconRainy from '~/weather/icons/Rainy' //雨
	import IconCloudy from '~/weather/icons/Cloudy' //多云
	import IconFlurries from '~/weather/icons/Flurries' //雪
	import IconStorm from '~/weather/icons/Storm' //闪电 雷阵雨
	import IconShower from '~/weather/icons/Shower' //阵雨

	@Component({
		components: {
			IconSunny,
			IconRainy,
			IconCloudy,
			IconFlurries,
			IconStorm,
			IconShower
		},
		'$route'(to, from) {
			this.Init()
		},
		props:{
			weather:{
				type:String,
				required:true
			},
			code:{
				type:String,
				required:true
			}
		}
	})
	export default class Weather extends Vue {
		view = 'IconSunny'
		created() {
			this.Init()
		}
		Init() {
			const weather = this.weather
			const code = +this.code
			if (
				weather.includes('云') ||
				weather === '阴' ||
				code >= 205 && code <= 213 ||
				code >= 500 && code <= 515
			) {
				this.view = 'IconCloudy'
			} else if (weather.includes('雷')) {
				this.view = 'IconStorm'
			} else if (weather.includes('阵雨')) {
				this.view = 'IconShower'
			} else if (weather.includes('雨')) {
				this.view = 'IconRainy'
			} else if (weather.includes('雪')) {
				this.view = 'IconFlurries'
			}
		}
	}
</script>

<style lang="stylus">
</style>
