<template lang="pug">
.consumption-result-component
	.consumption-chart(v-if="bulbs.length!==0")
		ve-histogram(:data="chartLineData" :settings="chartSettings" :toolbox="toolbox")
		.consumption-fore-cast-info
			.consumption-forecast(:span="24" type="flex" align="middle" justify="center" v-html="getForecastElectrics()")
	consumption-is-null(v-else)
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'
import ConsumptionIsNull from '~/consumption/IsNull'
import fcData from '@/utils/forecast'
import 'echarts/lib/component/toolbox'

@Component({
	components:{
		ConsumptionIsNull
	},
	computed:{
		...mapState('electrics', ['bulbs']),
		...mapState('forecast', ['allBulb'])
	},
	watch:{
		'$route'(){
			this.toInit()
		}
	}
})
export default class ConsumptionAllResult extends Vue{
	getForecastElectrics(){
		return `<p>您使用电器总花费 <strong>${fcData.fcAllBulb(this.allBulb)}</strong> 度</p>`
	}
	toolbox = { feature: { magicType: {type: ['line', 'bar']}, saveAsImage: {} } }

	chartSettings = {
		labelMap: {
			usageDate:'日期',
			usageAmount:'使用量(度)',
			usageTime:'使用时间(时)'
		},
		metrics: ['usageAmount', 'usageTime'],
		dimension: ['usageDate'],
		// showLine: ['usageAmount']
	}
	chartLineData = {
		columns: ['usageDate', 'usageAmount', 'usageTime'],
		rows: []
	}
	toInit(){
		if(!this.allBulb.length){
			this.$router.push({name:'ConsumptionIndex'})
		}
		this.chartLineData.rows = this.allBulb
	}
	created(){
		this.toInit()
	}
}
</script>

<style lang="stylus">
.consumption-result-component
	padding 10px 100px 30px
	.consumption-chart
		width 500px !important
	.consumption-fore-cast-info
		font-beautify()
		font-size .9em
		background-color #fff
		padding 10px 10px 2px
		box-shadow 0 0 10px #ccc
		border-radius 5px
		color #666
		margin-bottom 10px
		& *
			margin 10px auto
	.consumption-forecast
		border-radius 5px
		transition .3s
		&:hover
			transform translateY(-2px)
			color #999
</style>

