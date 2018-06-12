<template lang="pug">
el-main.main
	transition(v-if="isHome" name="rotate")
		.home-main
			weather-info
	transition(v-else name="rotate")
		router-view
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import {mapState} from 'vuex'

import WeatherInfo from '~/weather/Index'

@Component({
	components:{
		WeatherInfo
	},
	computed:{
		...mapState('ui',['isHome'])
	}
})
export default class Main extends Vue{
}
</script>

<style lang="stylus">
.main
	background #f0f2f5
	overflow hidden !important
.home-main
	padding 200px
	height 100vh
	width 100vw

</style>
