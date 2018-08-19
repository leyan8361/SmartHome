<template lang="pug">
.consumption-chart-component
	.consumption-chart-title(:span="24" type="flex" align="middle" justify="center")
		| 使用功耗
	ve-line(:data="chartData" :setting="chartSetting" v-if="bulbs.length!==0")
		router-link.more-info-consumption-link(:to="{name:'ConsumptionIndex'}")
			| 更多信息
	consumption-is-null(v-else)
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'
import ConsumptionIsNull from '~/consumption/IsNull'

@Component({
	components:{
		ConsumptionIsNull
	},
	computed:{
		...mapState('electrics', ['bulbs'])
	}
})
export default class Consumption extends Vue{

	chartSetting = {
		xAxisType: 'time'
	}
	chartData={
		columns: ['日期', '功耗', '电量', '使用率'],
		rows: [
			{ '日期': '2018-06-01', '功耗': 1393, '电量': 1093, '使用率': 0.32 },
			{ '日期': '2018-06-02', '功耗': 3530, '电量': 3230, '使用率': 0.26 },
			{ '日期': '2018-06-03', '功耗': 2923, '电量': 2623, '使用率': 0.76 },
			{ '日期': '2018-06-05', '功耗': 1723, '电量': 1423, '使用率': 0.49 },
			{ '日期': '2018-06-10', '功耗': 3792, '电量': 3492, '使用率': 0.323 },
			{ '日期': '2018-06-20', '功耗': 4593, '电量': 4293, '使用率': 0.78 }
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
.more-info-consumption-link
	font-beautify()
	display block
	cursor pointer
	width 120px
	text-align center
	padding 10px
	text-decoration none
	font-size .8em
	margin-top 5px
	margin-left 115px
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
