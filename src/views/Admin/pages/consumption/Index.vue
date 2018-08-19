<template lang="pug">
.consumption-index-component
	.consumption-chart(v-if="bulbs.length!==0")
		ve-line(:data="chartLineData" :setting="chartSetting")
		.consumption-fore-cast-info
			.consumption-forecast(:span="24" type="flex" align="middle" justify="center" v-html="getForecastElectrics()")
			.consumption-forecast(:span="24" type="flex" align="middle" justify="center" v-html="getNowInfo()")
			.consumption-forecast(:span="24" type="flex" align="middle" justify="center" v-html="getForecastInfo()")
		.consumption-tip(:span="24" type="flex" align="middle" justify="center")
			textra(:data="words" :timer="1" :sequence="true" :infinite="true")
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
	},
	watch:{
		'$route'(){
			this.toInit()
		}
	}
})
export default class Consumption extends Vue{
	getNowInfo(){
		return `<p>您本月份已耗电 <strong>${this.electricify}</strong> 度</p>`
	}
	getForecastInfo(){
		return `<p>预测本月将耗电 <strong>${this.electricifyWithForecast}</strong> 度</p>`
	}
	getForecastElectrics(){
		return `<p>预测电器还可用 <strong>${this.electricsLife}</strong> 年</p>`
	}
	words = ['我们将在每天凌晨自动更新了您的功耗信息~','使用人工智能分析电器能耗曲线，预判使用寿命。']
	chartSetting = {
		xAxisType: 'time'
	}
	chartLineData = {
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
	toInit(){
		this.electricify = this.chartLineData.rows.reduce((total,{'电量':value})=>total + value,0) / 1000
		this.electricifyWithForecast = this.chartLineData.rows.reduce((total,{'电量':value})=>total + value,0) / 1000 + 5
		this.electricsLife = 2
	}
	created(){
		this.toInit()
	}
}
</script>

<style lang="stylus">
.consumption-index-component
	padding 10px 100px 30px
	.consumption-chart
		width 500px !important
	.consumption-fore-cast-info
		font-beautify()
		font-size .9em
		margin-top -50px
		background-color #fff
		padding 10px 10px 2px
		box-shadow 0 0 10px #ccc
		border-radius 5px
		color #666
		text-shadow 0 0 3px #000
		margin-bottom 10px
		& *
			margin 10px auto
	.consumption-forecast
		border-radius 5px
		transition .3s
		&:hover
			transform translateY(-2px)
			color #999
	.consumption-tip
		font-beautify()
		font-size .9em
</style>
