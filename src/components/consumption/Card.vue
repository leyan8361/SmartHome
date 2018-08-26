<template lang="pug">
.consumption-chart-component
	.consumption-chart-title(:span="24" type="flex" align="middle" justify="center")
		| 使用功耗
	ve-line(:data="chartLineData" :settings="chartSettings" :data-zoom="dataZoom" v-if="bulbs.length!==0" :mark-line="markLine" )
		router-link.more-info-consumption-link(:to="{name:'ConsumptionIndex'}")
			| 更多信息
	consumption-is-null(v-else)
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState,mapMutations } from 'vuex'
import ConsumptionIsNull from '~/consumption/IsNull'
import 'echarts/lib/component/dataZoom'

import 'echarts/lib/component/markLine'

@Component({
	components:{
		ConsumptionIsNull
	},
	computed:{
		...mapState('electrics', ['bulbs']),
		...mapState('forecast',['allBulb'])
	},
	methods:{
		...mapMutations('forecast',['setAllBulb'])
	},
	watch:{
		'$route'(){
			this.toInit()
		}
	}
})
export default class Consumption extends Vue{
	dataZoom = [ { type: 'slider', start: 0, end: 20 } ]
	markLine = { data: [ { name: '平均线', type: 'average' } ] }
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
			this.setAllBulb()
		}
		this.chartLineData.rows = this.allBulb
	}
	created(){
		this.toInit()
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
