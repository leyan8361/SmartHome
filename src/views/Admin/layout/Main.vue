<template lang="pug">
el-main.main
	transition(name="fadeUp")
		router-view
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class Main extends Vue{

}
</script>

<style lang="stylus">
.main
	background #f0f2f5
</style>
