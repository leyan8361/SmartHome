<template lang="pug">
.usagelog-chart-component
	.usagelog-chart-title(:span="24" type="flex" align="middle" justify="center")
		| 操作日志
	.usagelog-chart(v-if="usagelogs.length!==0" :span="24" type="flex" align="middle" justify="center")
		ve-histogram(:data="chartData" :settings="chartSettings")
	usagelog-is-null(v-else :bulbs-are-null="bulbs.length===0")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import UsagelogIsNull from '~/usagelog/IsNull'

@Component({
	components:{
		UsagelogIsNull
	},
	computed: {
		...mapState('usagelog', ['usagelogs']),
		...mapState('electrics', ['bulbs'])
	},
	watch:{
		'$route'(){
			this.toInit()
		},
		'usagelogs'(){
			this.toInit()
		}
	}
})
export default class UsagelogChart extends Vue {
	chartSettings = {
		labelMap: {
			date:'时间',
			id: '操作电器',
			status: '状态',
			brightness:'亮度',
			color:'颜色'
		},
		metrics: ['status', 'brightness','color','id'],
		dimension: ['date'],
		showLine: ['brightness']
	}
	chartData = {
		columns: ['date', 'id', 'status', 'brightness','color'],
		rows: []
	}
	toInit(){
		const logs = this.usagelogs.slice()
		this.chartData.rows = logs.reduce((arr,curr) => {
			if(curr.id === '0'){
				curr.id = 100
			}else{
				const ids = ''.split.call(curr.id,',').length
				curr.id = ids / this.bulbs.length * 100
			}
			curr.status = curr.status ? 100 : 0
			if (curr.brightness === '保持原状') {
				curr.brightness = 100
			} else {
				curr.brightness = Number.parseInt(curr.brightness)
			}
			const hash = {
				'保持原状': 100,
				'自然光': 100,
				'暖白光': 75,
				'正白光': 50,
				'冷白光': 25
			}
			curr.color = hash[curr.color]
			arr.push(curr)
			return arr
		},[])
	}
	created(){
		this.toInit()
	}
}
</script>

<style lang="stylus">
.usagelog-chart-component
	position fixed
	top 15%
	left 72%
	box-shadow 2px 3px 10px #ccc
	border-radius 10px
	padding 20px 10px 0px
	width 400px
	.usagelog-chart-title
		font-beautify()
		font-size 1.5em
		margin-bottom 20px
	.usagelog-chart
		margin-bottom -50px
		transform scaleY(1)
</style>
