<template lang="pug">
	el-container#container
		el-header.header: home-header
		el-main.main: home-main
</template>

<script>
import HomeHeader from './body/Header.vue'
import HomeMain from './body/Main.vue'
import HomeFooter from './body/Footer.vue'
export default {
	name: 'Index',
	components: {
		HomeHeader,
		HomeMain,
		HomeFooter
	}
}
</script>

<style lang="stylus">
#container
	height 100vh
	min-height 100vh
	overflow hidden
	.main
		padding 0
</style>
