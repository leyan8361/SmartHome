<template lang="pug">
.consumption-chart-component
	.consumption-chart-title(:span="24" type="flex" align="middle" justify="center")
		| 使用功耗
	ve-line(:data="chartData" :setting="chartSetting")
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'

@Component
export default class Consumption extends Vue{
	chartSetting = {
		xAxisType: 'time'
	}
	chartData={
		columns: ['日期', '功耗', '电量', '使用率'],
		rows: [
			{ '日期': '2018-01-01', '功耗': 1393, '电量': 1093, '使用率': 0.32 },
			{ '日期': '2018-01-02', '功耗': 3530, '电量': 3230, '使用率': 0.26 },
			{ '日期': '2018-01-03', '功耗': 2923, '电量': 2623, '使用率': 0.76 },
			{ '日期': '2018-01-05', '功耗': 1723, '电量': 1423, '使用率': 0.49 },
			{ '日期': '2018-01-10', '功耗': 3792, '电量': 3492, '使用率': 0.323 },
			{ '日期': '2018-01-20', '功耗': 4593, '电量': 4293, '使用率': 0.78 }
		]
	}
}
</script>

<style lang="stylus">
.consumption-chart-component
	position fixed
	top 15%
	left 20%
	box-shadow 2px 3px 10px #ccc
	border-radius 10px
	padding 50px 10px
	width 380px
	height 575px
	.consumption-chart-title
		font-beautify()
		font-size 1.5em
		margin-bottom 20px
</style>
