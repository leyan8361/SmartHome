<template lang="pug">
.when-consumption-is-null(v-else :span="24" type="flex" align="middle" justify="center")
	el-row.consumption-tip
		| 您目前还没有自己的电器哦~
	el-row.controll-consumption-button
		el-button(type="success" @click.native="$router.push({name:'ElectricAdd'})") 添加电器
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class ConsumptionIsNull extends Vue{

}
</script>

<style lang="stylus">
.when-consumption-is-null
	font-beautify()
	font-size .9em
	margin 150px auto
	.consumption-tip
		margin-bottom 30px
</style>
