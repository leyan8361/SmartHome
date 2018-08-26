<template lang="pug">
.consumption-index-component
	.consumption-form(v-if="bulbs.length!==0")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-select(v-model="appliance" placeholder="请选择需要预测的电器")
				el-option(v-for="item in bulbs" :key="item.id" :label="item.name" :value="item.id")
		el-row(:span="24" type="flex" align="middle" justify="center")
			el-button.pre-button(type="primary" @click="predictive" :loading="isLoading") 开始预测
		.consumption-tip(:span="24" type="flex" align="middle" justify="center")
			textra(:data="words" :timer="1" :sequence="true" :infinite="true")
	consumption-is-null(v-else)
</template>

<script>
import {Component,Vue} from 'vue-property-decorator'
import { mapState,mapActions } from 'vuex'
import ConsumptionIsNull from '~/consumption/IsNull'
import notice from '@/utils/ui/notice'
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
	},
	methods:{
		...mapActions('forecast',['getServiceDataWithSingleBulb','getServiceDataWithAllBulb'])
	}
})
export default class Consumption extends Vue{
	isLoading = false
	appliance = ''
	words = ['我们将在每天凌晨自动更新了您的功耗信息~','使用人工智能分析电器能耗曲线，预判使用寿命。']
	toInit(){
		if(!this.bulbs.find(e=>e.id === 0)){
			this.bulbs.push({ name:'所有电器', id:0 })
		}
	}
	created(){
		this.toInit()
	}
	predictive(){
		if(!this.bulbs.find(e=>e.id === this.appliance)){
			return notice.warning('请选择一个选项！')
		}
		this.isLoading = true
		let name = 'ConsumptionAllResult'
		let func = 'getServiceDataWithAllBulb'
		if(this.appliance){
			name = 'ConsumptionSingleResult'
			func = 'getServiceDataWithSingleBulb'
		}

		this[func](this.appliance).then(e=>{
			this.isLoading = false
			if(e.success){
				this.$router.push({name})
			}else{
				notice.error(e.message)
			}
		}).catch(()=>{
			notice.error(e.message)
		})
	}
}
</script>

<style lang="stylus">
.consumption-index-component
	padding 10px 100px 30px
	font-beautify()
	.consumption-form
		padding 150px 0px 0px
		width 500px !important
	.pre-button
		margin-top 80px
	.consumption-tip
		margin-top 115px
		font-size .9em
</style>
