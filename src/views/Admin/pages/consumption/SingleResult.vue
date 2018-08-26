<template lang="pug">
.consumption-sresult-component
	.consumption-schart(v-if="bulbs.length!==0")
		ve-line(:data="chartLineData" :settings="chartSettings" :data-zoom="dataZoom" :toolbox="toolbox")
		.consumption-sfore-cast-info
			.consumption-sforecast(:span="24" type="flex" align="middle" justify="center" v-html="getForecastElectrics()")
	consumption-is-null(v-else)
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState } from 'vuex'
import ConsumptionIsNull from '~/consumption/IsNull'
import fcData from '@/utils/forecast'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'

@Component({
	components:{
		ConsumptionIsNull
	},
	computed:{
		...mapState('electrics', ['bulbs']),
		...mapState('forecast', ['singleBulb'])
	},
	watch:{
		'$route'(){
			this.toInit()
		}
	}
})
export default class ConsumptionSingleResult extends Vue{
	getForecastElectrics(){
		return `<p>预测该电器还可用 <strong>${fcData.fcSingleBulb(this.singleBulb)}</strong> 个小时</p>`
	}
	dataZoom = [ { type: 'slider', start: 0, end: 20 } ]
	toolbox = { feature: { magicType: {type: ['line', 'bar']}, saveAsImage: {} } }

	chartSettings = {
		labelMap: {
			usageDate:'日期',
			usageAmount:'使用量(度)',
			usageTime:'使用时间(时)',
			usageRate:'使用率'
		},
		dataType:{
			usageRate:'percent'
		},
		metrics: ['usageAmount', 'usageTime','usageRate'],
		dimension: ['usageDate'],
		showLine: ['usageAmount']
	}
	chartLineData = {
		columns: ['usageDate', 'usageAmount', 'usageTime','usageRate'],
		rows:[]
	}
	toInit(){
		if(!this.singleBulb.length){
			this.$router.push({name:'ConsumptionIndex'})
		}
		this.chartLineData.rows = this.singleBulb
	}
	created(){
		this.toInit()
	}
}
</script>

<style lang="stylus">
.consumption-sresult-component
	padding 10px 100px 30px
	.consumption-schart
		width 500px !important
	.consumption-sfore-cast-info
		font-beautify()
		font-size .9em
		margin-top 20px
		background-color #fff
		padding 10px 10px 2px
		box-shadow 0 0 10px #ccc
		border-radius 5px
		color #666
		margin-bottom 10px
		& *
			margin 10px auto
	.consumption-sforecast
		border-radius 5px
		transition .3s
		&:hover
			transform translateY(-2px)
			color #999
</style>

